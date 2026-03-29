import * as XLSX from "xlsx";
import type { StaffCreationRequest } from "@/types/staffTypes";

type HeaderKey =
  | "userName"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address"
  | "password"
  | "shift";

const REQUIRED: HeaderKey[] = ["userName", "email", "phone", "password"];

const HEADER_SYNONYMS: Record<HeaderKey, string[]> = {
  userName: ["username", "user name", "user", "login"],
  firstName: ["first name", "firstname", "first"],
  lastName: ["last name", "lastname", "last"],
  email: ["email", "e-mail"],
  phone: ["phone", "mobile", "số điện thoại"],
  address: ["address", "địa chỉ"],
  password: ["password", "passwd", "mật khẩu"],
  shift: ["shift", "ca"],
};

function normalizeHeader(cell: unknown): string {
  return String(cell ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function cellToString(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return String(v).trim();
}

function cellToShift(v: unknown): number {
  const s = cellToString(v);
  if (!s) return 1;
  const n = Number.parseInt(s, 10);
  if (!Number.isFinite(n)) return 1;
  return Math.min(3, Math.max(1, n));
}

function buildHeaderMap(headerRow: unknown[]): Partial<Record<HeaderKey, number>> {
  const normalized = headerRow.map((h) => normalizeHeader(h));
  const map: Partial<Record<HeaderKey, number>> = {};

  for (let i = 0; i < normalized.length; i++) {
    const h = normalized[i];
    if (!h) continue;

    (Object.keys(HEADER_SYNONYMS) as HeaderKey[]).forEach((key) => {
      if (map[key] !== undefined) return;
      if (h === key.toLowerCase() || HEADER_SYNONYMS[key].includes(h)) {
        map[key] = i;
      }
    });
  }

  return map;
}

/**
 * Reads the first sheet of an .xls / .xlsx file and builds {@link StaffCreationRequest} rows.
 * Expected columns (header row, flexible labels): Username, First name, Last name, Email, Phone, Address, Password, Shift.
 */
export async function parseStaffXls(file: File): Promise<StaffCreationRequest[]> {
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const firstSheet = wb.SheetNames[0];
  if (!firstSheet) {
    throw new Error("File has no sheets");
  }
  const ws = wb.Sheets[firstSheet];
  const rows = XLSX.utils.sheet_to_json<(string | number | boolean | null | undefined)[]>(ws, {
    header: 1,
    defval: "",
    raw: false,
  });

  if (!rows.length) {
    throw new Error("File is empty");
  }

  const headerMap = buildHeaderMap(rows[0] as unknown[]);
  for (const key of REQUIRED) {
    if (headerMap[key] === undefined) {
      throw new Error(
        `Missing column: ${key}. Required: Username, Email, Phone, Password. Optional: First name, Last name, Address, Shift.`
      );
    }
  }

  const out: StaffCreationRequest[] = [];
  const rowErrors: string[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r] as unknown[];
    if (!row || !row.length) continue;

    const get = (key: HeaderKey) => {
      const idx = headerMap[key];
      if (idx === undefined) return "";
      return cellToString(row[idx]);
    };

    const userName = get("userName");
    const email = get("email");
    const phone = get("phone");
    const password = get("password");

    if (!userName && !email && !phone && !password) {
      const any = row.some((c) => cellToString(c));
      if (!any) continue;
    }

    if (!userName || !email || !phone || !password) {
      rowErrors.push(`Row ${r + 1}: missing Username, Email, Phone, or Password`);
      continue;
    }

    const firstName = get("firstName");
    const lastName = get("lastName");
    const address = get("address");
    const shift = headerMap.shift !== undefined ? cellToShift(row[headerMap.shift]) : 1;

    out.push({
      shift,
      userCreationRequest: {
        userName,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email,
        phone,
        address: address || undefined,
        password,
      },
    });
  }

  if (rowErrors.length && !out.length) {
    throw new Error(rowErrors.slice(0, 5).join("\n") + (rowErrors.length > 5 ? "\n…" : ""));
  }

  if (!out.length) {
    throw new Error("No data rows found. Add at least one row under the header.");
  }

  if (rowErrors.length) {
    console.warn("Staff import row warnings:", rowErrors);
  }

  return out;
}
