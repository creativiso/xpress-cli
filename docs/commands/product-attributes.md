# product-attributes

Manage product attribute definitions and their predefined values.

Attributes have two types:
- **`predefined`** — a fixed list of values (e.g. "Color: Red, Blue, Green")
- **`number` / `date` / `text`** — raw values stored per-product via `products raw-attrs`

## Subcommands

### `list product-attributes`

| Option | Description |
|--------|-------------|
| `--all` | Include inactive attributes |

```bash
xpress list product-attributes
xpress list product-attributes --all --json
```

### `get product-attribute <id>`

Returns the attribute with all its predefined values.

```bash
xpress get product-attribute 5
```

### `create product-attribute`

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
xpress create product-attribute --name "Color" --type predefined --filter
xpress create product-attribute --name "Weight" --type number --suffix "kg" --show-on-card
```

### `update product-attribute <id>`

Same options as `create` (all optional).

```bash
xpress update product-attribute 5 --name "Colour" --show-on-card
```

### `delete product-attribute <id>`

```bash
xpress delete product-attribute 5
```

---

## Attribute values

Manage predefined values for a `predefined`-type attribute.

### `list attribute-values <attributeId>`

```bash
xpress list attribute-values 5
```

### `create attribute-value <attributeId>`

| Option | Required | Description |
|--------|----------|-------------|
| `--name <name>` | Yes | Value name |

```bash
xpress create attribute-value 5 --name "Red"
xpress create attribute-value 5 --name "Blue"
```

### `update attribute-value <attributeId> <valueId>`

```bash
xpress update attribute-value 5 12 --name "Crimson Red"
```

### `delete attribute-value <attributeId> <valueId>`

Cascades — removes i18n rows and product links.

```bash
xpress delete attribute-value 5 12
```
