# strings

Fetch translation strings as a flat key→value map.

## Subcommands

### `strings get`

| Option | Description |
|--------|-------------|
| `--group <prefix>` | Filter by key prefix (e.g. `nav` returns keys starting with `nav.`) |
| `--lang <code>` | Language code |

```bash
xpress strings get
xpress strings get --lang en
xpress strings get --lang bg --group nav
xpress strings get --json | jq 'to_entries[] | "\(.key): \(.value)"'
```

## Output

Returns a flat JSON object:

```json
{
  "nav.home": "Home",
  "nav.about": "About Us",
  "nav.contact": "Contact"
}
```

## Use case

Useful for populating i18n string tables in mobile apps or exporting translations for editing.
