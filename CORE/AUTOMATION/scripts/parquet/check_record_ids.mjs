import fs from 'fs';
import * as hp from 'hyparquet';

const buf = fs.readFileSync('CORE/DATA-HUB/processed-data/04_model_input/champion_dataset_v1.parquet');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
const meta = hp.parquetMetadata(arrayBuffer);
console.log('Columns:', meta.schema.map(s => s.name));
