const fs = require('fs');
let code = fs.readFileSync('src/types/domain.ts', 'utf8');
code = code.replace(/export interface ([a-zA-Z0-9_]+) extends Tables<"([a-zA-Z0-9_]+)"> \{/g, 'export type $1 = Tables<"$2"> & {');
fs.writeFileSync('src/types/domain.ts', code);
