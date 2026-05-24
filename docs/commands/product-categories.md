# product-categories

Manage the product category tree.

## Subcommands

### `list product-categories`

Returns a nested tree by default. Use `--flat` for a flat array (better for dropdowns/selects).

| Option | Description |
|--------|-------------|
| `--flat` | Return flat array instead of nested tree |

```bash
xpress list product-categories
xpress list product-categories --flat --json | jq '[.[] | {id, title}]'
```

### `get product-category <id>`

Returns the category with its direct children.

```bash
xpress get product-category 3
```

### `create product-category`

| Option | Required | Description |
|--------|----------|-------------|
| `--slug <slug>` | Yes | URL slug |
| `--title <title>` | Yes | Title |
| `--parent <id>` | No | Parent category ID (default: 0) |
| `--sort <n>` | No | Sort order (default: 0) |
| `--public` / `--no-public` | No | Visibility (default: public) |
| `--image <url>` | No | Category image URL |

```bash
xpress create product-category --slug clothing --title "Clothing"
xpress create product-category --slug shirts --title "Shirts" --parent 1
```

### `update product-category <id>`

| Option | Description |
|--------|-------------|
| `--title <title>` | New title |
| `--parent <id>` | New parent ID |
| `--sort <n>` | New sort order |
| `--public` / `--no-public` | Visibility |
| `--image <url>` | Image URL |

```bash
xpress update product-category 3 --title "T-Shirts" --sort 2
```

### `delete product-category <id>`

```bash
xpress delete product-category 3
```
