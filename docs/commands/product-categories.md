# product-categories

Manage the product category tree.

## Subcommands

### `product-categories list`

Returns a nested tree by default. Use `--flat` for a flat array (better for dropdowns/selects).

| Option | Description |
|--------|-------------|
| `--flat` | Return flat array instead of nested tree |

```bash
xpress product-categories list
xpress product-categories list --flat --json | jq '[.[] | {id, title}]'
```

### `product-categories get <id>`

Returns the category with its direct children.

```bash
xpress product-categories get 3
```

### `product-categories create`

| Option | Required | Description |
|--------|----------|-------------|
| `--slug <slug>` | Yes | URL slug |
| `--title <title>` | Yes | Title |
| `--parent <id>` | No | Parent category ID (default: 0) |
| `--sort <n>` | No | Sort order (default: 0) |
| `--public` / `--no-public` | No | Visibility (default: public) |
| `--image <url>` | No | Category image URL |

```bash
xpress product-categories create --slug clothing --title "Clothing"
xpress product-categories create --slug shirts --title "Shirts" --parent 1
```

### `product-categories update <id>`

| Option | Description |
|--------|-------------|
| `--title <title>` | New title |
| `--parent <id>` | New parent ID |
| `--sort <n>` | New sort order |
| `--public` / `--no-public` | Visibility |
| `--image <url>` | Image URL |

```bash
xpress product-categories update 3 --title "T-Shirts" --sort 2
```

### `product-categories delete <id>`

```bash
xpress product-categories delete 3
```
