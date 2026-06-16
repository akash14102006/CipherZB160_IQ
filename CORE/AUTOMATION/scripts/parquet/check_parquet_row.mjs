import fs from 'fs';
import * as hp from 'hyparquet';

const buf = fs.readFileSync('CORE/DATA-HUB/processed-data/outputs/risk_engine_output.parquet');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
const meta = hp.parquetMetadata(arrayBuffer);
console.log('Number of rows:', meta.num_rows);
console.log('Schema:', meta.schema.map(s => s.name));
