# xpress-cli

Official CLI for the [Creativiso Xpress](https://creativiso.net) public REST API.

Manage pages, articles, products, orders and more from the terminal — or feed it to an AI agent.

## Installation

```bash
npm install -g xpress-cli
```

## Setup

```bash
xpress config set-url https://your-site.com/pub/api/v1
xpress config set-token YOUR_BEARER_TOKEN
xpress config show
```

## Usage

```bash
xpress --help
xpress <command> --help

# Examples
xpress pages list --limit 5
xpress pages get 1 --json | jq '.title'
xpress products list --active 1 --json
xpress orders list --status pending
xpress strings get --lang en --group nav
```

## Commands

| Group | Description |
|-------|-------------|
| `config` | Manage CLI configuration (token, URL, default language) |
| `pages` | CRUD for pages + raw/markdown variants |
| `articles` | CRUD for articles |
| `article-categories` | CRUD for article categories |
| `products` | CRUD for products + raw-attrs sub-group |
| `product-categories` | CRUD for product categories |
| `product-attributes` | CRUD for attributes + values sub-group |
| `product-variations` | CRUD for variation categories |
| `product-options` | CRUD for option categories |
| `orders` | CRUD for orders |
| `strings` | Fetch translation strings |
| `indexed-urls` | Browse indexed URL records |

## Global flags

| Flag | Description |
|------|-------------|
| `--token <token>` | Override configured token |
| `--url <url>` | Override configured base URL |
| `--lang <lang>` | Language code (2-letter ISO) |
| `--json` | Output raw JSON (pipe-friendly) |
| `-q, --quiet` | Suppress non-data output |
| `-v, --verbose` | Print HTTP request details |

## Documentation

See [`docs/`](docs/) for detailed command references and an [AI agent guide](docs/ai-guide.md).

## License

MIT
