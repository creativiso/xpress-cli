# articles

Manage blog/news articles.

## Subcommands

### `articles list`

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--category-id <id>` | Filter by category ID | — |
| `--active <1\|0>` | Filter by active status | — |
| `--top <1\|0>` | Filter top articles | — |

```bash
xpress articles list
xpress articles list --category-id 3 --active 1
xpress articles list --top 1 --json | jq '[.data[].slug]'
```

### `articles get <id>`

```bash
xpress articles get 10
xpress articles get 10 --lang bg --json
```

### `articles create`

| Option | Required | Description |
|--------|----------|-------------|
| `--slug <slug>` | Yes | URL slug |
| `--title <title>` | Yes | Title |
| `--body <html>` | No | Body HTML |
| `--meta-title <title>` | No | SEO meta title |
| `--meta-description <desc>` | No | SEO meta description |
| `--image <url>` | No | Cover image URL |
| `--category-id <id>` | No | Category ID |
| `--active` / `--no-active` | No | Active status (default: active) |
| `--top` | No | Mark as top/featured |
| `--private` | No | Mark as private |

```bash
xpress articles create --slug my-article --title "My Article" --body "<p>Content</p>"
```

### `articles update <id>`

Same options as `create` (all optional). Also supports `--slug` to change the slug.

```bash
xpress articles update 10 --title "Updated Title" --active
xpress articles update 10 --no-active
```

### `articles delete <id>`

```bash
xpress articles delete 10
```
