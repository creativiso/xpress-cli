# product-variations

Manage variation category types (Size, Color, etc.) that define how product variations are grouped.

Each variation category has a `value_type`:
- **`simple`** — text label (e.g. S, M, L)
- **`color`** — color swatch with a hex value
- **`image`** — image-based selector

## Subcommands

### `list product-variations`

```bash
xpress list product-variations
xpress list product-variations --lang en --json
```

### `get product-variation <id>`

Returns the category with all its variation values.

```bash
xpress get product-variation 1
```

### `create product-variation`

| Option | Required | Description |
|--------|----------|-------------|
| `--name <name>` | Yes | Category name |
| `--value-type <type>` | Yes | `simple` \| `color` \| `image` |
| `--layout <layout>` | No | Display layout (default: `buttons`) |
| `--sort <n>` | No | Sort order (default: 0) |

```bash
xpress create product-variation --name "Size" --value-type simple
xpress create product-variation --name "Color" --value-type color --layout swatches
```

### `update product-variation <id>`

| Option | Description |
|--------|-------------|
| `--name <name>` | New name |
| `--value-type <type>` | New value type |
| `--layout <layout>` | New layout |
| `--sort <n>` | New sort order |

```bash
xpress update product-variation 1 --name "Size (EU)"
```

### `delete product-variation <id>`

Soft-deletes the variation category.

```bash
xpress delete product-variation 1
```
