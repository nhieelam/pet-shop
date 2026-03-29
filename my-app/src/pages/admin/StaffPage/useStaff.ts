"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type FormEvent,
} from "react";
import type { StaffCreationRequest, StaffData } from "../../../types/staffTypes";
import * as staffService from "../../../services/staffService";
import type { UserUpdateRequest } from "../../../types/userTypes.ts";
import * as userService from "../../../services/userService";
import { exportTableToXls } from "@/utils/exportFile.ts";
import { cellToString, readXlsFirstSheetRows } from "@/utils/importFile.ts";

export type ViewMode = "grid" | "list";

export const SHIFT_OPTIONS = [1, 2, 3] as const;

export interface StaffFormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  shift: number;
}

export interface StaffEditFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  shift: number;
}

const emptyForm: StaffFormData = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  shift: 1,
};

const emptyEditForm: StaffEditFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  shift: 1,
};

export function staffDisplayName(s: StaffData): string {
  const u = s.user;
  if (u?.firstname || u?.lastname) {
    return [u.firstname, u.lastname].filter(Boolean).join(" ").trim();
  }
  return u?.username ?? "—";
}

export function useStaff() {
  const [staffList, setStaffList] = useState<StaffData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffData | null>(null);
  const [staffToEdit, setStaffToEdit] = useState<StaffData | null>(null);
  const [staffToDelete, setStaffToDelete] = useState<StaffData | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [shiftSubmitting, setShiftSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [importSubmitting, setImportSubmitting] = useState(false);
  const [formData, setFormData] = useState<StaffFormData>(emptyForm);
  const [editFormData, setEditFormData] = useState<StaffEditFormData>(emptyEditForm);
  const [shiftValue, setShiftValue] = useState(1);

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await staffService.getAllStaff();
      setStaffList(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load staff");
      setStaffList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const filteredStaff = useMemo(() => {
    let result = [...staffList];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          (s.user?.username ?? "").toLowerCase().includes(q) ||
          (s.user?.firstname ?? "").toLowerCase().includes(q) ||
          (s.user?.lastname ?? "").toLowerCase().includes(q) ||
          (s.user?.email ?? "").toLowerCase().includes(q) ||
          (s.user?.phone ?? "").toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => (a.user?.username ?? "").localeCompare(b.user?.username ?? ""));
    return result;
  }, [staffList, search]);

  const stats = useMemo(
    () => ({
      total: staffList.length,
    }),
    [staffList]
  );

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, []);

  const openAddModal = useCallback(() => {
    setEditingStaff(null);
    setFormModalOpen(true);
  }, []);

  const openEditModal = useCallback((staff: StaffData) => {
    setStaffToEdit(staff);
    setEditModalOpen(true);
  }, []);

  const openShiftModal = useCallback((staff: StaffData) => {
    setEditingStaff(staff);
    setShiftModalOpen(true);
  }, []);

  const closeFormModal = useCallback(() => {
    setFormModalOpen(false);
    setEditingStaff(null);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModalOpen(false);
    setStaffToEdit(null);
  }, []);

  const closeShiftModal = useCallback(() => {
    setShiftModalOpen(false);
    setEditingStaff(null);
  }, []);

  const openDeleteModal = useCallback((staff: StaffData) => {
    setStaffToDelete(staff);
    setDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setStaffToDelete(null);
  }, []);

  const handleCreateStaff = useCallback(
    async (payload: StaffCreationRequest) => {
      try {
        await staffService.createStaff(payload);
        showToast("Staff added successfully!", "success");
        closeFormModal();
        await fetchStaff();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Failed to add staff", "error");
        throw e;
      }
    },
    [closeFormModal, fetchStaff, showToast]
  );

  const handleUpdateStaff = useCallback(
    async (id: string, payload: UserUpdateRequest) => {
      try {
        await userService.updateUser(id, payload);
        showToast("Staff updated successfully!", "success");
        closeEditModal();
        await fetchStaff();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Failed to update staff", "error");
        throw e;
      }
    },
    [closeEditModal, fetchStaff, showToast]
  );

  const handleUpdateShift = useCallback(
    async (id: string, shift: number) => {
      try {
        await staffService.updateStaffShift(id, shift);
        showToast("Shift updated successfully!", "success");
        closeShiftModal();
        await fetchStaff();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Failed to update shift", "error");
        throw e;
      }
    },
    [closeShiftModal, fetchStaff, showToast]
  );

  const handleDeleteStaff = useCallback(async () => {
    if (!staffToDelete?.id) return;
    try {
      await staffService.deleteStaff(staffToDelete.id);
      showToast("Staff deleted successfully!", "success");
      closeDeleteModal();
      await fetchStaff();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to delete staff", "error");
    }
  }, [staffToDelete, closeDeleteModal, fetchStaff, showToast]);

  useEffect(() => {
    if (editModalOpen && staffToEdit) {
      const u = staffToEdit.user;
      setEditFormData({
        firstName: u?.firstname ?? "",
        lastName: u?.lastname ?? "",
        email: u?.email ?? "",
        phone: u?.phone ?? "",
        address: u?.address ?? "",
        shift: staffToEdit.shift ?? 1,
      });
    }
  }, [editModalOpen, staffToEdit]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const payload: StaffCreationRequest = {
        shift: formData.shift,
        userCreationRequest: {
          userName: formData.userName.trim(),
          firstName: formData.firstName.trim() || undefined,
          lastName: formData.lastName.trim() || undefined,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim() || undefined,
          password: formData.password,
        },
      };
      await handleCreateStaff(payload);
      setFormData({ ...emptyForm });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!staffToEdit?.id) return;
    setEditSubmitting(true);
    try {
      const payload: UserUpdateRequest = {
        firstName: editFormData.firstName.trim() || undefined,
        lastName: editFormData.lastName.trim() || undefined,
        email: editFormData.email.trim() || undefined,
        phone: editFormData.phone.trim() || undefined,
        address: editFormData.address.trim() || undefined,
      };
      await handleUpdateStaff(staffToEdit.user.id, payload);
    } finally {
      setEditSubmitting(false);
    }
  };

  const openShiftModalFor = useCallback((s: StaffData) => {
    setShiftValue(s.shift ?? 1);
    openShiftModal(s);
  }, [openShiftModal]);

  const handleShiftSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingStaff?.id) return;
    setShiftSubmitting(true);
    try {
      await handleUpdateShift(editingStaff.id, shiftValue);
    } finally {
      setShiftSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteSubmitting(true);
    try {
      await handleDeleteStaff();
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const handleImportStaffFile = useCallback(
    async (file: File) => {
      setImportSubmitting(true);
      try {
        const rows = await readXlsFirstSheetRows(file);
        if (!rows.length) {
          throw new Error("File is empty");
        }
        const headerRow = rows[0];

        const list: StaffCreationRequest[] = [];

        const get = (key: string, row: unknown[]) => {
          const idx = headerRow.indexOf(key);
          if (idx === undefined) return "";
          return cellToString(row[idx]);
        };

        for (let r = 1; r < rows.length; r++) {
          const row = rows[r] as unknown[];
          if (!row?.length) continue;
          if (!row.some((c) => cellToString(c))) continue;

          try {
            const userName = get("userName", row);
            const email = get("email", row);
            const phone = get("phone", row);
            const password = get("password", row);

            const firstName = get("firstName", row);
            const lastName = get("lastName", row);
            const address = get("address", row);
            const shift = get("shift", row);
            list.push({
              shift: shift ? parseInt(shift, 10) : 1,
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
          } catch (err) {
          }
        }

        await staffService.createListStaff({staff:list});
        showToast(`Đã nhập ${list.length} nhân viên từ file`, "success");
        await fetchStaff();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Nhập file thất bại", "error");
      } finally {
        setImportSubmitting(false);
      }
    },
    [fetchStaff, showToast]
  );

  const handleExportStaff = useCallback(() => {
    exportTableToXls({
      filename: `staff-export-${new Date().toISOString().slice(0, 10)}`,
      sheetName: "Staff",
      headers: [
        "Staff ID",
        "Full name",
        "Username",
        "Email",
        "Phone",
        "Address",
        "Shift",
      ],
      data: filteredStaff.map((s) => {
        const u = s.user;
        return [
          s.id,
          staffDisplayName(s),
          u?.username ?? "",
          u?.email ?? "",
          u?.phone ?? "",
          u?.address ?? "",
          s.shift ?? 1,
        ];
      }),
    });
  }, [filteredStaff]);

  return {
    staff: filteredStaff,
    allStaff: staffList,
    loading,
    error,
    search,
    setSearch,
    viewMode,
    setViewMode,
    stats,
    formModalOpen,
    editModalOpen,
    shiftModalOpen,
    deleteModalOpen,
    editingStaff,
    staffToEdit,
    staffToDelete,
    toast,
    openAddModal,
    openEditModal,
    openShiftModal,
    closeFormModal,
    closeEditModal,
    closeShiftModal,
    openDeleteModal,
    closeDeleteModal,
    handleCreateStaff,
    handleUpdateStaff,
    handleUpdateShift,
    handleDeleteStaff,
    fetchStaff,
    handleExportStaff,
    handleImportStaffFile,
    importSubmitting,
    formSubmitting,
    editSubmitting,
    shiftSubmitting,
    deleteSubmitting,
    formData,
    setFormData,
    editFormData,
    setEditFormData,
    shiftValue,
    setShiftValue,
    handleFormSubmit,
    handleEditSubmit,
    openShiftModalFor,
    handleShiftSubmit,
    confirmDelete,
  };
}
