const hp = require('hyparquet');
const fs = require('fs');

async function run() {
  const buf = new Uint8Array(fs.readFileSync('data/05_output/risk_engine_output.parquet')).buffer;
  const meta = await hp.parquetMetadataAsync(buf);
  console.log("Risk Engine Output Columns:", meta.schema.map(s => s.name));

  const buf2 = new Uint8Array(fs.readFileSync('data/05_output/investigator_dataset.parquet')).buffer;
  const meta2 = await hp.parquetMetadataAsync(buf2);
  console.log("Investigator Dataset Columns:", meta2.schema.map(s => s.name));
}

run();
