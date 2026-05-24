# articles

Manage blog/news articles.

## Subcommands

### `list articles`

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--category-id <id>` | Filter by category ID | — |
| `--active <1\|0>` | Filter by active status | — |
| `--top <1\|0>` | Filter top articles | — |

```bash
xpress list articles
xpress list articles --category-id 3 --active 1
xpress list articles --top 1 --json | jq '[.data[].slug]'
```

### `get article <id>`

```bash
xpress get article 10
xpress get article 10 --lang bg --json
```

### `create article`

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
xpress create article --slug my-article --title "My Article" --body "<p>Content</p>"
```

### `update article <id>`

Same options as `create` (all optional). Also supports `--slug` to change the slug.

```bash
xpress update article 10 --title "Updated Title" --active
xpress update article 10 --no-active
```

### `delete article <id>`

```bash
xpress delete article 10
```
