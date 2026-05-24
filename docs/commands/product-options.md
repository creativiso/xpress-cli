# product-options

Manage product option categories (add-ons like gift wrap, engraving, etc.).

Each option category contains option items with a `price_change` that adjusts the cart total.

## Subcommands

### `list product-options`

```bash
xpress list product-options
xpress list product-options --lang en --json
```

### `get product-option <id>`

Returns the category with all its option items.

```bash
xpress get product-option 2
```

### `create product-option`

| Option | Required | Description |
|--------|----------|-------------|
| `--name <name>` | Yes | Category name |
| `--type <type>` | No | Display type (default: `default`) |
| `--required` | No | Make selection required |

```bash
xpress create product-option --name "Gift Wrap"
xpress create product-option --name "Engraving" --required
```

### `update product-option <id>`

| Option | Description |
|--------|-------------|
| `--name <name>` | New name |
| `--type <type>` | New type |
| `--required` / `--no-required` | Required flag |

```bash
xpress update product-option 2 --name "Gift Wrapping" --required
```

### `delete product-option <id>`

```bash
xpress delete product-option 2
```
