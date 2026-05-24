# orders

Manage customer orders.

## Subcommands

### `list orders`

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--status <status>` | Filter by status | — |
| `--customer-id <id>` | Filter by customer ID | — |
| `--email <email>` | Filter by customer email | — |

```bash
xpress list orders
xpress list orders --status pending --json
xpress list orders --email customer@example.com
```

### `get order <id>`

Returns the full order with all items and option details.

```bash
xpress get order 100
xpress get order 100 --json
```

### `create order`

| Option | Required | Description |
|--------|----------|-------------|
| `--email <email>` | Yes | Customer email |
| `--items <json>` | Yes | JSON array of order items |
| `--first-name <name>` | No | First name |
| `--last-name <name>` | No | Last name |
| `--phone <phone>` | No | Phone |
| `--city <city>` | No | City |
| `--address <address>` | No | Delivery address |
| `--comment <comment>` | No | Order comment |
| `--delivery <method>` | No | Delivery method |
| `--payment <method>` | No | Payment method |
| `--office <office>` | No | Office/branch for courier delivery |
| `--currency <code>` | No | Currency (default: `EUR`) |
| `--payment-type <type>` | No | Payment type (default: `other`) |

The `--items` value is a JSON array. Each item:

```json
[
  {
    "product": 42,
    "qty": 2,
    "variation": null,
    "options": []
  }
]
```

```bash
xpress create order \
  --email buyer@example.com \
  --first-name Jane \
  --last-name Doe \
  --items '[{"product":42,"qty":1,"variation":null,"options":[]}]'
```

### `update order <id>`

| Option | Description |
|--------|-------------|
| `--status <status>` | New order status |
| `--payment-status <status>` | New payment status |
| `--payment-type <type>` | Payment type |
| `--comment <comment>` | Updated comment |
| `--metadata <json>` | Metadata object as JSON |

```bash
xpress update order 100 --status shipped
xpress update order 100 --payment-status paid --metadata '{"tracking":"XY123456"}'
```

### `delete order <id>`

Deletes the order and all its items.

```bash
xpress delete order 100
```

## Order status values

Common statuses (site-configurable): `pending`, `processing`, `shipped`, `delivered`, `cancelled`

## Payment status values

Common values: `unpaid`, `paid`, `refunded`
