# orders

Manage customer orders.

## Subcommands

### `orders list`

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--status <status>` | Filter by status | — |
| `--customer-id <id>` | Filter by customer ID | — |
| `--email <email>` | Filter by customer email | — |

```bash
xpress orders list
xpress orders list --status pending --json
xpress orders list --email customer@example.com
```

### `orders get <id>`

Returns the full order with all items and option details.

```bash
xpress orders get 100
xpress orders get 100 --json
```

### `orders create`

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
xpress orders create \
  --email buyer@example.com \
  --first-name Jane \
  --last-name Doe \
  --items '[{"product":42,"qty":1,"variation":null,"options":[]}]'
```

### `orders update <id>`

| Option | Description |
|--------|-------------|
| `--status <status>` | New order status |
| `--payment-status <status>` | New payment status |
| `--payment-type <type>` | Payment type |
| `--comment <comment>` | Updated comment |
| `--metadata <json>` | Metadata object as JSON |

```bash
xpress orders update 100 --status shipped
xpress orders update 100 --payment-status paid --metadata '{"tracking":"XY123456"}'
```

### `orders delete <id>`

Deletes the order and all its items.

```bash
xpress orders delete 100
```

## Order status values

Common statuses (site-configurable): `pending`, `processing`, `shipped`, `delivered`, `cancelled`

## Payment status values

Common values: `unpaid`, `paid`, `refunded`
