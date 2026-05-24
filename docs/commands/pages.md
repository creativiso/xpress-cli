# pages

Manage site pages.

## Subcommands

### `list pages`

List pages with pagination.

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page (max 100) | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--parent <id>` | Filter by parent page ID | — |
| `--lang <code>` | Language code | config default |

```bash
xpress list pages
xpress list pages --limit 5 --offset 10
xpress list pages --parent 0 --json
```

### `get page <id>`

Get a page with normalized content.

```bash
xpress get page 1
xpress get page 1 --lang en --json
```

### `get page <id> --raw`

Get a page with the full Sequelize association tree (raw database output).

```bash
xpress get page 1 --raw --json
```

### `get page <id> --md`

Same as `get` but includes `md_body` — all text content concatenated as Markdown (body, extra_content values, multicontent titles/content).

```bash
xpress get page 1 --md --json | jq -r '.md_body'
```

### `create page`

| Option | Required | Description |
|--------|----------|-------------|
| `--slug <slug>` | Yes | URL slug |
| `--title <title>` | Yes | Page title |
| `--template <name>` | No | Template name (default: `page`) |
| `--public` / `--no-public` | No | Visibility (default: public) |
| `--parent <id>` | No | Parent page ID |
| `--sort <n>` | No | Sort order |
| `--body <html>` | No | Body HTML |
| `--extra-description <text>` | No | Extra description |
| `--page-image <url>` | No | Page image URL |

```bash
xpress create page --slug about --title "About Us"
xpress create page --slug contact --title "Contact" --template contact --no-public
```

### `update page <id>`

Same options as `create` (all optional).

```bash
xpress update page 5 --title "New Title"
xpress update page 5 --no-public
```

### `delete page <id>`

```bash
xpress delete page 5
```

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Page ID |
| `slug` | string | URL identifier |
| `title` | string | i18n title |
| `template` | string | Template name used to render the page |
| `public` | boolean | Whether the page is publicly visible |
| `parent` | integer | Parent page ID (0 = root) |
| `sort` | integer | Sort order among siblings |
| `body` | string\|null | Rich text body (HTML) |
| `extra_content` | object | Key→value map of additional content slots |
| `multicontent` | object | Key→array map for repeatable content blocks |
| `sections` | array | Page sections |
| `langs` | string[] | Available language codes |
