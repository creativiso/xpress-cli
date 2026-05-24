# product-variations

Manage variation category types (Size, Color, etc.) that define how product variations are grouped.

Each variation category has a `value_type`:
- **`simple`** — text label (e.g. S, M, L)
- **`color`** — color swatch with a hex value
- **`image`** — image-based selector

## Subcommands

### `product-variations list`

```bash
xpress product-variations list
xpress product-variations list --lang en --json
```

### `product-variations get <id>`

Returns the category with all its variation values.

```bash
xpress product-variations get 1
```

### `product-variations create`

| Option | Required | Description |
|--------|----------|-------------|
| `--name <name>` | Yes | Category name |
| `--value-type <type>` | Yes | `simple` \| `color` \| `image` |
| `--layout <layout>` | No | Display layout (default: `buttons`) |
| `--sort <n>` | No | Sort order (default: 0) |

```bash
xpress product-variations create --name "Size" --value-type simple
xpress product-variations create --name "Color" --value-type color --layout swatches
```

### `product-variations update <id>`

| Option | Description |
|--------|-------------|
| `--name <name>` | New name |
| `--value-type <type>` | New value type |
| `--layout <layout>` | New layout |
| `--sort <n>` | New sort order |

```bash
xpress product-variations update 1 --name "Size (EU)"
```

### `product-variations delete <id>`

Soft-deletes the variation category.

```bash
xpress product-variations delete 1
```
