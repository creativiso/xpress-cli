# @creativiso/xpress-cli

Official CLI for the [Creativiso Xpress](https://creativiso.net) public REST API.

Manage pages, articles, products, orders and more from the terminal — or feed it to an AI agent.

## Installation

```bash
npm install -g @creativiso/xpress-cli
```

## Quick Start

```bash
# Authenticate and add a site
xpress login

# List configured sites
xpress config list

# Set default language
xpress config set-lang bg

# View current configuration
xpress config show
```

## Usage

```bash
xpress --help
xpress <command> --help
xpress <action> <resource> --help

# Examples
xpress list pages --limit 5
xpress get page 1 --json | jq '.title'
xpress list products --active 1 --json
xpress list orders --status pending
xpress list strings --group nav
xpress create article --slug my-post --title "My Post"
xpress update order 100 --status completed
xpress delete product 5
```

## Commands

### Authentication & Configuration

| Command | Description |
|---------|-------------|
| `login` | Add or update a site (interactive) |
| `logout` | Remove current or specified site |
| `config list` | List all configured sites |
| `config show [site]` | Show details for a site |
| `config use [site]` | Set the default site |
| `config remove <site>` | Remove a site from config |
| `config set-lang <lang>` | Set default language for a site |

### Resource Actions

| Action | Description |
|--------|-------------|
| `list <resource>` | List resources (paginated) |
| `get <resource> <id>` | Get a single resource by ID |
| `create <resource>` | Create a new resource |
| `update <resource> <id>` | Update an existing resource |
| `delete <resource> <id>` | Delete a resource |

### Available Resources

**List resources:**
- `pages`, `articles`, `article-categories`, `products`, `product-categories`
- `product-attributes`, `attribute-values`, `product-variations`, `product-options`
- `product-raw-attrs <productId>`, `orders`, `strings`, `indexed-urls`

**Get resources:**
- `page`, `article`, `article-category`, `product`, `product-category`
- `product-attribute`, `product-variation`, `product-option`, `order`, `indexed-url`

**Create resources:**
- `page`, `article`, `article-category`, `product`, `product-category`
- `product-attribute`, `attribute-value`, `product-variation`, `product-option`, `order`

**Update resources:**
- `page`, `article`, `article-category`, `product`, `product-category`
- `product-attribute`, `attribute-value`, `product-raw-attr`
- `product-variation`, `product-option`, `order`

**Delete resources:**
- `page`, `article`, `article-category`, `product`, `product-category`
- `product-attribute`, `attribute-value`, `product-raw-attr`
- `product-variation`, `product-option`, `order`, `indexed-url`

## Global Flags

| Flag | Description |
|------|-------------|
| `-s, --site <site>` | Named site to use (overrides default) |
| `-t, --token <token>` | API bearer token (overrides config) |
| `-u, --url <url>` | API base URL (overrides config) |
| `-l, --lang <lang>` | Language code (overrides config defaultLang) |
| `-j, --json` | Output raw JSON (pipe-friendly) |
| `-q, --quiet` | Suppress non-data output |
| `-v, --verbose` | Print HTTP request details to stderr |

## Pagination

For list commands that return paginated results:

| Flag | Description |
|------|-------------|
| `-p, --page <n>` | Page number, 1-based (computes offset automatically) |
| `-n, --page-size <n>` | Items per page (alias: `--limit`, default: 20) |
| `--offset <n>` | Raw offset — use `--page` instead when possible |

## Documentation

See [`docs/`](docs/) for detailed command references:
- [AI Agent Guide](docs/ai-guide.md)
- [Articles](docs/commands/articles.md)
- [Pages](docs/commands/pages.md)
- [Orders](docs/commands/orders.md)
- [Products](docs/commands/products.md)
- [Product Categories](docs/commands/product-categories.md)
- [Product Attributes](docs/commands/product-attributes.md)
- [Product Variations](docs/commands/product-variations.md)
- [Product Options](docs/commands/product-options.md)
- [Article Categories](docs/commands/article-categories.md)
- [Indexed URLs](docs/commands/indexed-urls.md)
- [Strings](docs/commands/strings.md)

## License

MIT
