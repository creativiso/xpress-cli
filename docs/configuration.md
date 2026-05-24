# Configuration

Configuration is stored at `~/.xpress-cli.json` and supports multiple named sites.

## Config file shape

```json
{
  "default": "mysite",
  "sites": {
    "mysite": {
      "token": "your-bearer-token",
      "baseUrl": "https://mysite.com/pub/api/v1",
      "defaultLang": "en"
    },
    "staging": {
      "token": "staging-token",
      "baseUrl": "https://staging.mysite.com/pub/api/v1"
    }
  }
}
```

## Site management commands

```bash
xpress login                      # Add or update a site (interactive)
xpress logout                     # Remove a site (interactive)
xpress config list                # List all configured sites
xpress config show [site]         # Show details for a site (token masked)
xpress config use <site>          # Set the default site
xpress config remove <site>       # Remove a site
xpress config set-lang <lang>     # Set default language for the active site
xpress config set-lang <lang> -s staging  # Set language for a specific site
```

## Command structure

All resource commands follow the pattern `xpress <action> <resource> [id] [options]`:

```bash
xpress list   <resource> [options]
xpress get    <resource> <id> [options]
xpress create <resource> [options]
xpress update <resource> <id> [options]
xpress delete <resource> <id>
```

## Available resources

| Resource | list | get | create | update | delete |
|---|---|---|---|---|---|
| `pages` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `articles` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `article-categories` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `products` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `product-categories` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `product-attributes` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `attribute-values` | ✔ | — | ✔ | ✔ | ✔ |
| `product-variations` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `product-options` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `product-raw-attrs` | ✔ | — | — | ✔ | ✔ |
| `orders` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `strings` | ✔ | — | — | — | — |
| `indexed-urls` | ✔ | ✔ | — | — | ✔ |

## Language resolution

Language is resolved in this order:

1. `-l, --lang <code>` flag on the command
2. `defaultLang` of the active site in `~/.xpress-cli.json`
3. Site default (server-side)

## Global flags

These flags apply to every command and override stored config:

| Flag | Short | Description |
|---|---|---|
| `--site <site>` | `-s` | Use a named site (overrides default) |
| `--token <token>` | `-t` | Override stored token |
| `--url <url>` | `-u` | Override stored base URL |
| `--lang <lang>` | `-l` | Language code for this request |
| `--json` | `-j` | Output raw JSON to stdout |
| `--quiet` | `-q` | Suppress status messages and pagination footer |
| `--verbose` | `-v` | Print HTTP method, URL, params, and body to stderr |

## Migration from v0.1.x

If you have an existing `~/.xpress-cli.json` with the old flat format:

```json
{ "token": "...", "baseUrl": "...", "defaultLang": "en" }
```

It will be automatically migrated to the new multi-site format the first time you run any `xpress` command. The existing credentials are preserved as a site named `"default"`.
