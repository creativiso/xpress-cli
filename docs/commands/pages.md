# pages

Manage site pages.

## Subcommands

### `pages list`

List pages with pagination.

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Items per page (max 100) | 20 |
| `--offset <n>` | Items to skip | 0 |
| `--parent <id>` | Filter by parent page ID | — |
| `--lang <code>` | Language code | config default |

```bash
xpress pages list
xpress pages list --limit 5 --offset 10
xpress pages list --parent 0 --json
```

### `pages get <id>`

Get a page with normalized content.

```bash
xpress pages get 1
xpress pages get 1 --lang en --json
```

### `pages get-raw <id>`

Get a page with the full Sequelize association tree (raw database output).

```bash
xpress pages get-raw 1 --json
```

### `pages get-md <id>`

Same as `get` but includes `md_body` — all text content concatenated as Markdown (body, extra_content values, multicontent titles/content).

```bash
xpress pages get-md 1 --json | jq -r '.md_body'
```

### `pages create`

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
xpress pages create --slug about --title "About Us"
xpress pages create --slug contact --title "Contact" --template contact --no-public
```

### `pages update <id>`

Same options as `create` (all optional).

```bash
xpress pages update 5 --title "New Title"
xpress pages update 5 --no-public
```

### `pages delete <id>`

```bash
xpress pages delete 5
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
