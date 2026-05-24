# product-attributes

Manage product attribute definitions and their predefined values.

Attributes have two types:
- **`predefined`** — a fixed list of values (e.g. "Color: Red, Blue, Green")
- **`number` / `date` / `text`** — raw values stored per-product via `products raw-attrs`

## Subcommands

### `product-attributes list`

| Option | Description |
|--------|-------------|
| `--all` | Include inactive attributes |

```bash
xpress product-attributes list
xpress product-attributes list --all --json
```

### `product-attributes get <id>`

Returns the attribute with all its predefined values.

```bash
xpress product-attributes get 5
```

### `product-attributes create`

| Option | Required | Description |
|--------|----------|-------------|
| `--name <name>` | Yes | Attribute name |
| `--type <type>` | Yes | `predefined` \| `number` \| `date` \| `text` |
| `--filter` | No | Enable as filterable attribute |
| `--active` / `--no-active` | No | Active status (default: active) |
| `--prefix <prefix>` | No | Display prefix (e.g. `$`) |
| `--suffix <suffix>` | No | Display suffix (e.g. `kg`) |
| `--show-on-card` | No | Show value on product listing cards |

```bash
xpress product-attributes create --name "Color" --type predefined --filter
xpress product-attributes create --name "Weight" --type number --suffix "kg" --show-on-card
```

### `product-attributes update <id>`

Same options as `create` (all optional).

```bash
xpress product-attributes update 5 --name "Colour" --show-on-card
```

### `product-attributes delete <id>`

```bash
xpress product-attributes delete 5
```

---

## product-attributes values

Manage predefined values for a `predefined`-type attribute.

### `product-attributes values list <attributeId>`

```bash
xpress product-attributes values list 5
```

### `product-attributes values add <attributeId>`

| Option | Required | Description |
|--------|----------|-------------|
| `--name <name>` | Yes | Value name |

```bash
xpress product-attributes values add 5 --name "Red"
xpress product-attributes values add 5 --name "Blue"
```

### `product-attributes values update <attributeId> <valueId>`

```bash
xpress product-attributes values update 5 12 --name "Crimson Red"
```

### `product-attributes values delete <attributeId> <valueId>`

Cascades — removes i18n rows and product links.

```bash
xpress product-attributes values delete 5 12
```
