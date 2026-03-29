import * as XLSX from "xlsx";

export function cellToString(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return String(v).trim();
}

export async function readXlsFirstSheetRows(file: File): Promise<unknown[][]> {
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const firstSheet = wb.SheetNames[0];
  if (!firstSheet) {
    return [];
  }
  const ws = wb.Sheets[firstSheet];
  const rows = XLSX.utils.sheet_to_json<(string | number | boolean | null | undefined)[]>(ws, {
    header: 1,
    defval: "",
    raw: false,
  });
  return (rows ?? []) as unknown[][];
}
