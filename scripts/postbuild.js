const fs = require('fs');
const f = 'dist/bin/cli.js';
let c = fs.readFileSync(f, 'utf8');
if (!c.startsWith('#!/')) {
  fs.writeFileSync(f, '#!/usr/bin/env node\n' + c);
}
fs.chmodSync(f, '755');
