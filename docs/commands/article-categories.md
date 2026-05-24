# article-categories

Manage article/blog categories.

## Subcommands

### `list article-categories`

Returns a flat array of all categories.

```bash
xpress list article-categories
xpress list article-categories --lang en --json
```

### `get article-category <id>`

```bash
xpress get article-category 2
```

### `create article-category`

| Option | Required | Description |
|--------|----------|-------------|
| `--slug <slug>` | Yes | URL slug |
| `--title <title>` | Yes | Title |
| `--parent <id>` | No | Parent category ID (default: 0) |
| `--sort <n>` | No | Sort order (default: 0) |

```bash
xpress create article-category --slug news --title "News"
xpress create article-category --slug local --title "Local News" --parent 1
```

### `update article-category <id>`

| Option | Description |
|--------|-------------|
| `--title <title>` | New title |
| `--parent <id>` | New parent ID |
| `--sort <n>` | New sort order |

```bash
xpress update article-category 2 --title "Breaking News"
```

### `delete article-category <id>`

```bash
xpress delete article-category 2
```
