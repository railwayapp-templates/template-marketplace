# Deploy Ontology Browser on Railway

A web front-end for navigating and querying OWL ontologies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hI-_yx)

## About

A service to load and browse a single ontology (and its imports) on startup, with beautiful rendering for easy navigation.

Supports anything the OWLAPI can load:
* OWL
* RDF
* SKOS / SKOS-XL
* linked data
* knowledge graphs

Features

* Navigation of all entities (classes, properties, individuals and datatypes)
* Hierarchies, subclass/property/relations/annotations
* Entity usage
* Manchester OWL Syntax rendering
* Ontology metrics
* Searching
* DL Query (with set subtraction)
* Axioms view (and search)
* Paging
* Dark mode

To load your own, set the root ontology location and reasoner root ontology IRI environment variables:

* ONTOLOGY_ROOT_LOCATION=your ontology URL
* REASONING_ROOT_IRI=IRI of the ontology to be reasoned with
* PROJECT_NAME=Ontology name
* PROJECT_URL=Project documentation url
* PROJECT_TAGLINE=Project tagline text
* PROJECT_CONTACT=Email address of contact
* LABEL_IRI=IRI of the annotation property to use for rendering
* RESTART_SECRET=used for /restart endpoint secret param

Please see https://github.com/nickdrummond/ontology-browser for more details

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ontology Browser | [nickdrummond/ontology-browser](https://github.com/nickdrummond/ontology-browser) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LABEL_IRI` | http://www.w3.org/2000/01/rdf-schema#label | The annotation property IRI for your entity labels |
| `PROJECT_URL` | - | A link to your project homepage |
| `PROJECT_NAME` | My Ontology | A title for your ontology project |
| `PROJECT_CONTACT` | me@mydomain.com | A contact email for your project |
| `PROJECT_TAGLINE` | This is a great ontology | A tag line for your ontology project |
| `REASONING_ROOT_IRI` | https://nickdrummond.github.io/star-wars-ontology/ontologies/events.owl.ttl | The IRI for the ontology to reason over. This may be an import of your main ontology. |
| `ONTOLOGY_ROOT_LOCATION` | https://nickdrummond.github.io/star-wars-ontology/ontologies/all.owl.ttl | URL from which to load your ontology. This must be publicly available. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Java, JavaScript, HTML, CSS, Procfile

[View on Railway →](https://railway.com/deploy/hI-_yx)
