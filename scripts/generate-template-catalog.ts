import * as fs from "fs/promises";
import * as path from "path";

const API_URL = "https://backboard.railway.com/graphql/v2";

const query = `
  query {
    templates {
      edges {
        node {
          name
          code
          description
          category
          readme
          tags
          languages
          isVerified
          serializedConfig
        }
      }
    }
  }
`;

// Inline types (subset of @railway/models used for type hints only)
interface SerializedTemplateService {
  name?: string;
  source?: {
    image?: string;
    repo?: string;
    branch?: string;
    rootDirectory?: string;
  };
  variables?: Record<
    string,
    {
      description?: string | null;
      defaultValue?: string | null;
      isOptional?: boolean | null;
      isSealed?: boolean | null;
      generator?: string | null;
      value?: string | null;
    } | null
  >;
  networking?: {
    serviceDomains?: Record<string, unknown>;
    tcpProxies?: Record<string, unknown>;
  };
  deploy?: {
    startCommand?: string;
    healthcheckPath?: string;
  };
  volumeMounts?: Record<string, { mountPath?: string }>;
}

interface SerializedTemplate {
  services?: Record<string, SerializedTemplateService>;
}

interface TemplateNode {
  name: string;
  code: string;
  description: string | null;
  readme: string | null;
  category: string | null;
  tags: string[];
  languages: string[];
  isVerified: boolean;
  serializedConfig: SerializedTemplate | null;
}

async function fetchTemplates(): Promise<TemplateNode[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.data.templates.edges.map(
    (edge: { node: TemplateNode }) => edge.node,
  );
}

function inferServiceType(service: SerializedTemplateService): string {
  const hasDomains =
    service.networking?.serviceDomains &&
    Object.keys(service.networking.serviceDomains).length > 0;
  const hasTcpProxies =
    service.networking?.tcpProxies &&
    Object.keys(service.networking.tcpProxies).length > 0;
  const hasVolumes =
    service.volumeMounts && Object.keys(service.volumeMounts).length > 0;
  const image = service.source?.image?.toLowerCase() ?? "";

  const dbImages = [
    "postgres",
    "mysql",
    "mongo",
    "redis",
    "mariadb",
    "clickhouse",
    "minio",
    "cassandra",
    "scylla",
    "couchdb",
    "neo4j",
    "influxdb",
    "timescale",
    "supabase",
    "cockroach",
    "memcached",
    "rabbitmq",
    "kafka",
    "nats",
    "valkey",
    "keydb",
    "dragonflydb",
  ];

  if (dbImages.some((db) => image.includes(db))) return "Database";
  if (hasVolumes && !hasDomains) return "Database";
  if (hasTcpProxies) return "TCP service";
  if (hasDomains) return "Web service";
  return "Worker";
}

function formatSource(service: SerializedTemplateService): string {
  if (service.source?.image) return `\`${service.source.image}\``;
  if (service.source?.repo) {
    const repo = service.source.repo;
    const url = repo.startsWith("http") ? repo : `https://github.com/${repo}`;
    const label = repo.replace(/^https?:\/\/github\.com\//, "");
    let s = `[${label}](${url})`;
    if (service.source.branch) s += ` (branch: ${service.source.branch})`;
    if (service.source.rootDirectory)
      s += ` (root: ${service.source.rootDirectory})`;
    return s;
  }
  return "-";
}

/**
 * Extract only the "Deploy and Host" intro and "About Hosting" sections from
 * standardized template readmes. For non-standard readmes, return the full text.
 */
function extractAboutSections(readme: string): string | null {
  const text = readme.trim();
  if (!text) return null;

  const lines = text.split("\n");
  const sections: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (/^#{1,2} /.test(line)) {
      if (current.length > 0) sections.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) sections.push(current);

  // Look for the standard sections
  const deployHostSection = sections.find((s) =>
    /^# Deploy and Host/i.test(s[0]),
  );
  const aboutHostingSection = sections.find((s) =>
    /^## About Hosting/i.test(s[0]),
  );

  if (!deployHostSection && !aboutHostingSection) {
    // Non-standard readme — return full text
    return text;
  }

  const parts: string[] = [];

  if (deployHostSection) {
    // Include body text after the heading (skip the heading itself since we have our own)
    const body = deployHostSection.slice(1).join("\n").trim();
    if (body) parts.push(body);
  }

  if (aboutHostingSection) {
    // Include the body, skip the "## About Hosting X" heading
    const body = aboutHostingSection.slice(1).join("\n").trim();
    if (body) parts.push(body);
  }

  return parts.length > 0 ? parts.join("\n\n") : null;
}

function generateTemplateMarkdown(template: TemplateNode): string {
  const lines: string[] = [];
  const {
    name,
    code,
    description,
    readme,
    category,
    tags,
    languages,
    isVerified,
    serializedConfig,
  } = template;

  lines.push(`# Deploy ${name} on Railway`);
  lines.push("");
  lines.push(description || "Deploy this application on Railway.");
  lines.push("");
  lines.push(
    `[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/${code})`,
  );

  if (readme) {
    const about = extractAboutSections(readme);
    if (about) {
      lines.push("");
      lines.push("## About");
      lines.push("");
      lines.push(about);
    }
  }

  // Services table
  if (serializedConfig?.services) {
    const services = Object.entries(serializedConfig.services);
    if (services.length > 0) {
      lines.push("");
      lines.push("## What gets deployed");
      lines.push("");
      lines.push("| Service | Source | Type |");
      lines.push("|---------|--------|------|");
      for (const [id, service] of services) {
        const svcName = service.name ?? id;
        const source = formatSource(service);
        const type = inferServiceType(service);
        lines.push(`| ${svcName} | ${source} | ${type} |`);
      }
    }

    // Environment variables (grouped by service)
    const isReference = (val: string) => /\$\{\{/.test(val);
    const credentialPattern =
      /PASSWORD|SECRET|TOKEN|API_KEY|CREDENTIAL|AUTH_KEY|AUTH_SECRET|_USER$|USERNAME|LOGIN/i;
    const isCredential = (
      varName: string,
      variable: { generator?: string | null; isSealed?: boolean | null },
    ) =>
      (variable.generator && /secret/i.test(variable.generator)) ||
      variable.isSealed ||
      credentialPattern.test(varName);

    // Railway infra / build variables that users don't configure
    const infraPattern =
      /^NIXPACKS_|^RAILWAY_|^PGDATA$|^PGHOST$|^PGPORT$|^PGUSER$|^PGDATABASE$|^PGPASSWORD$|^SSL_CERT_DAYS$/i;

    type VarEntry = {
      varName: string;
      value: string | null;
      desc: string | null;
    };
    const varsByService: { serviceName: string; vars: VarEntry[] }[] = [];

    for (const [id, service] of services) {
      if (!service.variables) continue;
      const svcName = service.name ?? id;
      const svcVars: VarEntry[] = [];

      for (const [varName, variable] of Object.entries(service.variables)) {
        if (!variable) continue;

        // Skip Railway infra/build variables
        if (infraPattern.test(varName)) continue;

        // Determine the display value
        let value: string | null = null;
        if (isCredential(varName, variable)) {
          value = "(secret)";
        } else if (variable.generator) {
          value = `Auto-generated`;
        } else if (
          variable.defaultValue &&
          !isReference(variable.defaultValue)
        ) {
          value = variable.defaultValue;
        }

        const desc = variable.description || null;

        // Only include if there's something useful to show
        if (!value && !desc) continue;

        svcVars.push({ varName, value, desc });
      }

      if (svcVars.length > 0) {
        varsByService.push({ serviceName: svcName, vars: svcVars });
      }
    }

    if (varsByService.length > 0) {
      const allVars = varsByService.flatMap((s) => s.vars);
      const hasValues = allVars.some((v) => v.value);
      const hasDescs = allVars.some((v) => v.desc);
      const multipleServices = varsByService.length > 1;

      lines.push("");
      lines.push("## Environment variables");
      lines.push("");

      const header = ["Variable"];
      const separator = ["---------"];
      if (multipleServices) {
        header.push("Service");
        separator.push("-------");
      }
      if (hasValues) {
        header.push("Default");
        separator.push("-------");
      }
      if (hasDescs) {
        header.push("Description");
        separator.push("-----------");
      }

      lines.push(`| ${header.join(" | ")} |`);
      lines.push(`| ${separator.join(" | ")} |`);

      for (const { serviceName, vars } of varsByService) {
        for (const v of vars) {
          const cols = [`\`${v.varName}\``];
          if (multipleServices) cols.push(serviceName);
          if (hasValues) cols.push(v.value ?? "-");
          if (hasDescs) cols.push(v.desc ?? "-");
          lines.push(`| ${cols.join(" | ")} |`);
        }
      }
    }

    // Configuration details
    const configLines: string[] = [];
    for (const [, service] of services) {
      if (service.deploy?.startCommand) {
        configLines.push(
          `- **Start command:** \`${service.deploy.startCommand}\``,
        );
      }
      if (service.deploy?.healthcheckPath) {
        configLines.push(
          `- **Healthcheck:** \`${service.deploy.healthcheckPath}\``,
        );
      }
      if (
        service.networking?.serviceDomains &&
        Object.keys(service.networking.serviceDomains).length > 0
      ) {
        configLines.push(
          "- **Networking:** Public domain with automatic HTTPS",
        );
      }
      if (
        service.networking?.tcpProxies &&
        Object.keys(service.networking.tcpProxies).length > 0
      ) {
        const ports = Object.keys(service.networking.tcpProxies).join(", ");
        configLines.push(`- **TCP Proxies:** ${ports}`);
      }
      if (service.volumeMounts) {
        for (const [, mount] of Object.entries(service.volumeMounts)) {
          if (mount.mountPath) {
            configLines.push(`- **Volume:** \`${mount.mountPath}\``);
          }
        }
      }
    }

    if (configLines.length > 0) {
      lines.push("");
      lines.push("## Configuration");
      lines.push("");
      // Deduplicate config lines
      for (const line of [...new Set(configLines)]) {
        lines.push(line);
      }
    }
  }

  // Footer metadata
  const metaParts: string[] = [];
  if (category) metaParts.push(`**Category:** ${category}`);
  if (isVerified) metaParts.push(`**Verified:** Yes`);
  if (tags?.length) metaParts.push(`**Tags:** ${tags.join(", ")}`);
  if (languages?.length)
    metaParts.push(`**Languages:** ${languages.join(", ")}`);

  if (metaParts.length > 0) {
    lines.push("");
    lines.push(metaParts.join(" · "));
  }

  lines.push("");
  lines.push(`[View on Railway →](https://railway.com/deploy/${code})`);
  lines.push("");

  return lines.join("\n");
}

function templateFilename(name: string, code: string): string {
  const slug = name
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${slug}---${code}.md`;
}

function categoryDir(category: string | null): string {
  return (category || "Other").toLowerCase().replace(/[/\s]+/g, "-");
}

function generateReadme(templates: TemplateNode[]): string {
  const sorted = [...templates].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const lines: string[] = [];
  lines.push("# Railway Templates");
  lines.push("");
  lines.push(
    "One-click deploy templates for Railway. [Browse all templates](https://railway.com/deploy)",
  );
  lines.push("");
  lines.push("## Templates");
  lines.push("");
  lines.push("| Template | Category | Verified | Languages | Deploy |");
  lines.push("|----------|----------|----------|-----------|--------|");

  for (const t of sorted) {
    const escapedName = t.name.replace(/\|/g, "-");
    const langs = t.languages?.join(", ") || "-";
    const cat = t.category || "-";
    const verified = t.isVerified ? "Yes" : "";
    const dir = categoryDir(t.category);
    const file = templateFilename(t.name, t.code);
    lines.push(
      `| [${escapedName}](./${dir}/${file}) | ${cat} | ${verified} | ${langs} | [Deploy](https://railway.com/deploy/${t.code}) |`,
    );
  }

  lines.push("");
  return lines.join("\n");
}

async function main() {
  // Parse --output flag
  const outputIdx = process.argv.indexOf("--output");
  const outputDir =
    outputIdx !== -1 && process.argv[outputIdx + 1]
      ? process.argv[outputIdx + 1]
      : ".";

  await fs.mkdir(outputDir, { recursive: true });

  // biome-ignore lint/suspicious/noConsole: script output
  console.log("Fetching templates...");
  const templates = await fetchTemplates();

  if (templates.length === 0) {
    // biome-ignore lint/suspicious/noConsole: script output
    console.log("No templates found, exiting.");
    return;
  }

  // Clean existing files and category directories to remove stale content
  const existingEntries = await fs.readdir(outputDir, { withFileTypes: true });
  for (const entry of existingEntries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "scripts") continue;
    if (entry.isDirectory()) {
      await fs.rm(path.join(outputDir, entry.name), { recursive: true });
    } else if (entry.name.endsWith(".md") && entry.name !== "README.md") {
      await fs.unlink(path.join(outputDir, entry.name));
    }
  }

  // Generate per-template files organized by category
  for (const template of templates) {
    const dir = categoryDir(template.category);
    const catDir = path.join(outputDir, dir);
    await fs.mkdir(catDir, { recursive: true });
    const filename = templateFilename(template.name, template.code);
    const content = generateTemplateMarkdown(template);
    await fs.writeFile(path.join(catDir, filename), content);
  }

  // Generate README
  const readme = generateReadme(templates);
  await fs.writeFile(path.join(outputDir, "README.md"), readme);

  // biome-ignore lint/suspicious/noConsole: script output
  console.log(`Generated ${templates.length} template files in ${outputDir}`);
}

main();
