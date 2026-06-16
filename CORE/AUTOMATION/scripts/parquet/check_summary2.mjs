import fs from 'fs';
import * as hp from 'hyparquet';

const countActualLabel = (p) => {
  const buf = fs.readFileSync(p);
  const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  let label1 = 0;
  let total = 0;
  
  hp.parquetRead({
    file: arrayBuffer,
    onComplete: (columns) => {
      if (columns.length > 0 && typeof columns[0] === 'object' && !Array.isArray(columns[0])) {
        columns.forEach(row => {
          if (row.actual_label === 1 || row.actual_label === 1n || row.label === 1 || row.label === 1n) label1++;
          total++;
        });
      } else {
        const meta = hp.parquetMetadata(arrayBuffer);
        const colNames = meta.schema.map(s => s.name).slice(1);
        const labelIdx = colNames.findIndex(n => n.includes('label'));
        if (labelIdx !== -1) {
          columns.forEach(row => {
            const val = Array.isArray(row) ? row[labelIdx] : row[colNames[labelIdx]];
            if (val === 1 || val === 1n || Number(val) === 1) label1++;
            total++;
          });
        }
      }
      console.log(p, 'Total:', total, 'Actual Label 1:', label1);
    }
  });
};

countActualLabel('CORE/DATA-HUB/processed-data/04_model_input/test.parquet');
countActualLabel('CORE/DATA-HUB/processed-data/04_model_input/train.parquet');
countActualLabel('CORE/DATA-HUB/processed-data/04_model_input/validation.parquet');
