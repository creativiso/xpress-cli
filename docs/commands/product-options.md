# product-options

Manage product option categories (add-ons like gift wrap, engraving, etc.).

Each option category contains option items with a `price_change` that adjusts the cart total.

## Subcommands

### `product-options list`

```bash
xpress product-options list
xpress product-options list --lang en --json
```

### `product-options get <id>`

Returns the category with all its option items.

```bash
xpress product-options get 2
```

### `product-options create`

| Option | Required | Description |
|--------|----------|-------------|
| `--name <name>` | Yes | Category name |
| `--type <type>` | No | Display type (default: `default`) |
| `--required` | No | Make selection required |

```bash
xpress product-options create --name "Gift Wrap"
xpress product-options create --name "Engraving" --required
```

### `product-options update <id>`

| Option | Description |
|--------|-------------|
| `--name <name>` | New name |
| `--type <type>` | New type |
| `--required` / `--no-required` | Required flag |

```bash
xpress product-options update 2 --name "Gift Wrapping" --required
```

### `product-options delete <id>`

```bash
xpress product-options delete 2
```
