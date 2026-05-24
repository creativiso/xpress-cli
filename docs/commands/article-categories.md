# article-categories

Manage article/blog categories.

## Subcommands

### `article-categories list`

Returns a flat array of all categories.

```bash
xpress article-categories list
xpress article-categories list --lang en --json
```

### `article-categories get <id>`

```bash
xpress article-categories get 2
```

### `article-categories create`

| Option | Required | Description |
|--------|----------|-------------|
| `--slug <slug>` | Yes | URL slug |
| `--title <title>` | Yes | Title |
| `--parent <id>` | No | Parent category ID (default: 0) |
| `--sort <n>` | No | Sort order (default: 0) |

```bash
xpress article-categories create --slug news --title "News"
xpress article-categories create --slug local --title "Local News" --parent 1
```

### `article-categories update <id>`

| Option | Description |
|--------|-------------|
| `--title <title>` | New title |
| `--parent <id>` | New parent ID |
| `--sort <n>` | New sort order |

```bash
xpress article-categories update 2 --title "Breaking News"
```

### `article-categories delete <id>`

```bash
xpress article-categories delete 2
```
