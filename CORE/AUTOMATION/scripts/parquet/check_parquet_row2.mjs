import fs from 'fs';
import * as hp from 'hyparquet';

const checkFile = (p) => {
  const buf = fs.readFileSync(p);
  const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const meta = hp.parquetMetadata(arrayBuffer);
  console.log(p, 'rows:', meta.num_rows);
};

checkFile('CORE/DATA-HUB/processed-data/04_model_input/champion_dataset_v1.parquet');
checkFile('CORE/DATA-HUB/processed-data/04_model_input/enterprise_training_dataset_v1.parquet');
checkFile('CORE/DATA-HUB/processed-data/04_model_input/test.parquet');
checkFile('CORE/DATA-HUB/processed-data/04_model_input/train.parquet');
checkFile('CORE/DATA-HUB/processed-data/04_model_input/validation.parquet');
checkFile('CORE/DATA-HUB/processed-data/engineered_dataset_v1.parquet');
checkFile('data/feature_store/selected_dataset_v1.parquet');
