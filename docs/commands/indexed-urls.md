# indexed-urls

Browse indexed URL records. Read-only — these are managed by the server.

Each record maps a URL path to a specific resource (Page, Product, Article, etc.).

## Subcommands

### `list indexed-urls`

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--resource-type <type>` | Filter by type (`Page`, `Product`, `Article`) | — |
| `--active <1\|0>` | Filter by active status | — |

```bash
xpress list indexed-urls
xpress list indexed-urls --resource-type Product --active 1
xpress list indexed-urls --json | jq '[.data[] | {url, resource_type, resource_id}]'
```

### `get indexed-url <id>`

```bash
xpress get indexed-url 55
```

## Fields

| Field | Description |
|-------|-------------|
| `id` | Record ID |
| `url` | The indexed URL path (e.g. `/products/red-shirt`) |
| `resource_type` | Resource type (`Page`, `Product`, `Article`, …) |
| `resource_id` | ID of the associated resource |
| `active` | Whether this is the currently active URL for the resource (a resource may have historical URLs that are no longer active) |

## Use case

Use this endpoint to build a sitemap or resolve which resource a given URL refers to.
