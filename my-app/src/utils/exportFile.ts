import * as XLSX from "xlsx";
export interface ExportTableToXlsOptions {
  filename: string;
  sheetName?: string;
  headers: string[];
  data: (string | number | boolean)[][];
}


export function exportTableToXls(options: ExportTableToXlsOptions): void {
  const { headers, data, sheetName = "Sheet1" } = options;
  let filename = options.filename.trim() || "export";
  if (!/\.(xlsx|xls)$/i.test(filename)) {
    filename = `${filename}.xlsx`;
  }

  const aoa: (string | number | boolean)[][] = [headers, ...data];

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}
