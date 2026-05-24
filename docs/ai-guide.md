# xpress-cli AI Agent Guide

xpress-cli wraps the Creativiso Xpress public REST API, letting AI agents create, update, and query site content (pages, articles, products, orders, etc.) via terminal commands.

## Minimum Setup

```bash
npm install -g @creativiso/xpress-cli
xpress login  # interactive: enter URL and API token
xpress list pages --limit 1  # verify connectivity
```

## Resource Taxonomy

| Resource | CLI group | API prefix | Operations |
|----------|-----------|------------|------------|
| Pages | `page` | `/pages` | list, get (with --raw, --md), create, update, delete |
| Articles | `article` | `/articles` | list, get, create, update, delete |
| Article categories | `article-category` | `/article-categories` | list, get, create, update, delete |
| Products | `product` | `/products` | list, get (with --raw, --md), create, update, delete |
| Product raw attrs | `product-raw-attr` | `/products/{id}/raw-attribute-values` | list, update, delete |
| Product categories | `product-category` | `/product-categories` | list, get, create, update, delete |
| Product attributes | `product-attribute` | `/product-attributes` | list, get, create, update, delete |
| Attribute values | `attribute-value` | `/product-attributes/{id}/values` | list, create, update, delete |
| Variation categories | `product-variation` | `/product-variation-categories` | list, get, create, update, delete |
| Option categories | `product-option` | `/product-options` | list, get, create, update, delete |
| Orders | `order` | `/orders` | list, get, create, update, delete |
| Strings | `strings` | `/strings` | list |
| Indexed URLs | `indexed-url` | `/indexed-urls` | list, get |

## Data Model Notes

- **`product_type`**: `physical` | `digital` | `service` — affects fulfillment logic
- **`effective_price`**: pre-computed sale price (accounts for `discount` and `discount_type`). Use this for display.
- **`value_type`** (variation categories): `simple` | `color` | `image` — controls how variation selectors render
- **`raw` vs `predefined` attributes**: `predefined` attributes have a fixed list of values (e.g. "Color: Red, Blue"); `raw` attributes are free-form text/numeric/date values stored per-product
- **`list product-categories`**: returns a nested tree by default; use `--flat` for a flat array suitable for dropdowns
- **`get page <id> --md`** / **`get product <id> --md`**: includes `md_body` — all text content concatenated as Markdown. Useful for AI content generation tasks.

## Common AI Agent Patterns

```bash
# Paginate: get page 2 with 50 items per page
xpress list products --page 2 --page-size 50 --json | jq '.data[].id'

# Get all product IDs as JSON array
xpress list products --json | jq '[.data[].id]'

# Get a page's markdown body for summarization
xpress get page 42 --md --json | jq -r '.md_body'

# List orders awaiting fulfillment
xpress list orders --status pending --json | jq '.data[] | {id, email, total}'

# Set a numeric attribute on a product
xpress update product-raw-attr 100 5 --numeric 9.99

# Create a product and capture its ID
PRODUCT_ID=$(xpress create product --slug new-item --name "New Item" --price 29.99 --json | jq '.id')

# Batch update: mark all active articles in category 3
xpress list articles --category-id 3 --active 1 --json | jq '.data[].id' | xargs -I{} xpress update article {} --top

# Get navigation strings
xpress list strings --lang en --group nav --json
```

## Error Codes

| HTTP | CLI message |
|------|-------------|
| 401 | `Unauthorized. Run: xpress login` |
| 403 | `Permission denied` |
| 404 | `Not found` |
| 429 | `Rate limit exceeded. Please wait and try again` |
| 4xx/5xx | Detail from the API `ProblemDetails.detail` field |

## Language Handling

Language resolution order (highest priority first):
1. `--lang <code>` flag on any command
2. `XPRESS_LANG` environment variable (not yet supported)
3. `defaultLang` in `~/.xpress-cli.json` (`xpress config set-lang en`)
4. Site default (server-side)

## Scripting Tips

- Always use `--json` when piping output to `jq` or another tool
- Use `-q` to suppress the pagination footer and success messages
- Use `--verbose` to debug HTTP issues (shows method, URL, params, body)
- Paginated endpoints return `{ data: [...], meta: { total, limit, offset } }`
- Use `-p <n>` / `--page <n>` for 1-based page number and `-n <n>` / `--page-size <n>` for items per page (default 20); `--limit` and `--offset` are lower-level aliases
- Non-paginated list endpoints return a plain array
