# products

Manage e-commerce products. Also includes the `raw-attrs` sub-group for raw attribute values.

## Subcommands

### `list products`

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--category <slug>` | Filter by category slug | — |
| `--active <1\|0>` | Filter by active status | — |
| `--sku <sku>` | Filter by SKU | — |

```bash
xpress list products
xpress list products --active 1 --limit 50 --json
xpress list products --sku ABC123 --json | jq '.data[0].id'
```

### `get product <id>`

Returns fully normalized product with sections, attributes, variations, and options.

```bash
xpress get product 42
xpress get product 42 --lang en --json
```

### `get product <id> --raw`

Returns the raw Sequelize association tree.

```bash
xpress get product 42 --raw --json
```

### `get product <id> --md`

Same as `get` but includes `md_body` — description and all section content concatenated as Markdown.

```bash
xpress get product 42 --md --json | jq -r '.md_body'
```

### `create product`

| Option | Required | Description |
|--------|----------|-------------|
| `--slug <slug>` | Yes | URL slug |
| `--name <name>` | Yes | Product name |
| `--price <price>` | Yes | Base price |
| `--discount <n>` | No | Discount value |
| `--discount-type <type>` | No | `percent` or `fixed` |
| `--sku <sku>` | No | SKU |
| `--barcode <code>` | No | Barcode |
| `--quantity <n>` | No | Stock quantity (default: 0) |
| `--weight <n>` | No | Weight (default: 0) |
| `--product-type <type>` | No | `physical` \| `digital` \| `service` (default: physical) |
| `--active` / `--no-active` | No | Active status (default: active) |
| `--category-id <id>` | No | Category ID |
| `--description <html>` | No | Description HTML |

```bash
xpress create product --slug red-shirt --name "Red Shirt" --price 29.99 --quantity 100
xpress create product --slug ebook --name "My Ebook" --price 9.99 --product-type digital
```

### `update product <id>`

Same options as `create` (all optional, `--slug` not updatable).

```bash
xpress update product 42 --price 24.99 --discount 10 --discount-type percent
xpress update product 42 --no-active
```

### `delete product <id>`

```bash
xpress delete product 42
```

---

## Raw attribute values

Manage raw (text/numeric/date) attribute values on a specific product.

### `list product-raw-attrs <productId>`

```bash
xpress list product-raw-attrs 42 --json
```

### `update product-raw-attr <productId> <attrId>`

Provide exactly one value flag:

| Flag | Description |
|------|-------------|
| `--text <value>` | Set a text value |
| `--numeric <value>` | Set a numeric value |
| `--date <YYYY-MM-DD>` | Set a date value |

```bash
xpress update product-raw-attr 42 5 --numeric 9.99
xpress update product-raw-attr 42 7 --text "Organic cotton"
xpress update product-raw-attr 42 9 --date 2026-01-01
```

### `delete product-raw-attr <productId> <attrId>`

```bash
xpress delete product-raw-attr 42 5
```

---

## Key fields

| Field | Description |
|-------|-------------|
| `effective_price` | Final price after discount — use this for display |
| `product_type` | `physical` \| `digital` \| `service` |
| `attributes.predefined` | Attributes with a fixed set of values (e.g. Color: Red) |
| `attributes.raw` | Free-form text/numeric/date attribute values |
| `variations.categories` | Variation category definitions (Size, Color…) |
| `variations.sets` | Specific combinations with their own price/stock |
| `options` | Add-on option categories (e.g. Gift wrap) |
