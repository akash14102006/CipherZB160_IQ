import * as hp from 'hyparquet';
import fs from 'fs';

async function run() {
  const buf = new Uint8Array(fs.readFileSync('CORE/DATA-HUB/processed-data/outputs/risk_engine_output.parquet')).buffer;
  await hp.parquetRead({
    file: buf,
    onComplete: (data) => {
      console.log("First 10 risk_scores:", data.slice(0, 10).map(row => row[2]));
      console.log("First 10 risk_probabilities:", data.slice(0, 10).map(row => row[1]));
    }
  });
}

run();
