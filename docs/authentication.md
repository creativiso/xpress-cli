# Authentication

All API requests require a Bearer token. Tokens are issued from the Xpress admin panel.

## Getting a token

1. Log in to your Xpress admin panel
2. Go to **Settings → API Tokens**
3. Create a new token and copy it

## Logging in

Use `xpress login` to add a site interactively:

```
$ xpress login
Site name [default]: mysite
Base URL: https://mysite.com/pub/api/v1
API token: ••••••••
Set "mysite" as default site? (Y/n):
✔ Site "mysite" saved.
```

This writes the site config to `~/.xpress-cli.json` with `0600` permissions (owner-read-only).

## Managing multiple sites

Run `xpress login` again to add more sites:

```bash
xpress login          # add another site interactively
xpress config list    # list all configured sites
xpress config use mysite   # switch the default site
```

## Per-command site override

Use `--site` to target a specific site for a single command:

```bash
xpress list pages --site staging
```

Use `--token` and `--url` to override individual values directly:

```bash
xpress list pages --token OTHER_TOKEN --url https://staging.example.com/pub/api/v1
```

## Security

- `~/.xpress-cli.json` is created with `chmod 600` — only your user can read it
- Never commit this file to version control
- Tokens are sent as `Authorization: Bearer <token>` on every request
