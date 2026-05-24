# xpress-cli AI Agent Guide

xpress-cli wraps the Creativiso Xpress public REST API, letting AI agents create, update, and query site content (pages, articles, products, orders, etc.) via terminal commands.

## Minimum Setup

```bash
npm install -g xpress-cli
xpress config set-url https://your-site.com/pub/api/v1
xpress config set-token YOUR_BEARER_TOKEN
xpress pages list --limit 1  # verify connectivity
```

## Resource Taxonomy

| Resource | CLI group | API prefix | Operations |
|----------|-----------|------------|------------|
| Pages | `pages` | `/pages` | list, get, get-raw, get-md, create, update, delete |
| Articles | `articles` | `/articles` | list, get, create, update, delete |
| Article categories | `article-categories` | `/article-categories` | list, get, create, update, delete |
| Products | `products` | `/products` | list, get, get-raw, get-md, create, update, delete |
| Product raw attrs | `products raw-attrs` | `/products/{id}/raw-attribute-values` | list, set, delete |
| Product categories | `product-categories` | `/product-categories` | list, get, create, update, delete |
| Product attributes | `product-attributes` | `/product-attributes` | list, get, create, update, delete |
| Attribute values | `product-attributes values` | `/product-attributes/{id}/values` | list, add, update, delete |
| Variation categories | `product-variations` | `/product-variation-categories` | list, get, create, update, delete |
| Option categories | `product-options` | `/product-options` | list, get, create, update, delete |
| Orders | `orders` | `/orders` | list, get, create, update, delete |
| Strings | `strings` | `/strings` | get |
| Indexed URLs | `indexed-urls` | `/indexed-urls` | list, get |

## Data Model Notes

- **`product_type`**: `physical` | `digital` | `service` — affects fulfillment logic
- **`effective_price`**: pre-computed sale price (accounts for `discount` and `discount_type`). Use this for display.
- **`value_type`** (variation categories): `simple` | `color` | `image` — controls how variation selectors render
- **`raw` vs `predefined` attributes**: `predefined` attributes have a fixed list of values (e.g. "Color: Red, Blue"); `raw` attributes are free-form text/numeric/date values stored per-product
- **`product-categories list`**: returns a nested tree by default; use `--flat` for a flat array suitable for dropdowns
- **`pages get-md` / `products get-md`**: includes `md_body` — all text content concatenated as Markdown. Useful for AI content generation tasks.

## Common AI Agent Patterns

```bash
# Get all product IDs as JSON array
xpress products list --json | jq '[.data[].id]'

# Get a page's markdown body for summarization
xpress pages get-md 42 --json | jq -r '.md_body'

# List orders awaiting fulfillment
xpress orders list --status pending --json | jq '.data[] | {id, email, total}'

# Set a numeric attribute on a product
xpress products raw-attrs set 100 5 --numeric 9.99

# Create a product and capture its ID
PRODUCT_ID=$(xpress products create --slug new-item --name "New Item" --price 29.99 --json | jq '.id')

# Batch update: mark all active articles in category 3
xpress articles list --category-id 3 --active 1 --json | jq '.[].id' | xargs -I{} xpress articles update {} --top

# Get navigation strings
xpress strings get --lang en --group nav --json
```

## Error Codes

| HTTP | CLI message |
|------|-------------|
| 401 | `Unauthorized. Run: xpress config set-token <token>` |
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
- Non-paginated list endpoints return a plain array
