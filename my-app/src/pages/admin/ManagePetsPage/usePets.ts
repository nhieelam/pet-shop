import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { PetData, PetCreationRequest, PetUpdateRequest } from "../../../types/petTypes";
import * as petService from "../../../services/petService";
import { exportTableToXls } from "@/utils/exportFile";
import { isCloudinaryConfigured } from "@/services/cloudinaryService";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";

export type ViewMode = "grid" | "list";

export function usePets() {
  const [pets, setPets] = useState<PetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [soldModalOpen, setSoldModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [petToEdit, setPetToEdit] = useState<PetData | null>(null);
  const [petToMarkSold, setPetToMarkSold] = useState<PetData | null>(null);
  const [petToDelete, setPetToDelete] = useState<PetData | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefEdit = useRef<HTMLInputElement>(null);
  const cloudinaryEnabled = isCloudinaryConfigured();

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageUrl: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageUploadError(null);
    setImageUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setImageUrl(url);
    } catch (err) {
      setImageUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setImageUploading(false);
      e.target.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (fileInputRefEdit.current) fileInputRefEdit.current.value = "";
    }
  };

  const [formData, setFormData] = useState<PetCreationRequest>({
    name: "",
    species: "",
    breed: "",
    birth: "",
    gender: "",
    price: 0,
    vaccinated: false,
    imageUrl: "",
  });
  const [editFormData, setEditFormData] = useState<PetUpdateRequest & { birth: string }>({
    name: "",
    species: "",
    breed: "",
    birth: "",  
    gender: "",
    price: 0,
    vaccinated: false,
    imageUrl: "",
    available: true,
  });

  useEffect(() => {
    if (formModalOpen || editModalOpen) setImageUploadError(null);
  }, [formModalOpen, editModalOpen]);

  useEffect(() => {
    if (editModalOpen && petToEdit) {
      const b = petToEdit.birth;
      const birthStr = typeof b === "string" ? b.split("T")[0] ?? "" : "";
      setEditFormData({
        name: petToEdit.name ?? "",
        species: petToEdit.species ?? "",
        breed: petToEdit.breed ?? "",
        birth: birthStr,
        gender: petToEdit.gender ?? "",
        price: petToEdit.price ?? 0,
        vaccinated: petToEdit.vaccinated ?? false,
        imageUrl: petToEdit.imageUrl ?? "",
        available: petToEdit.available !== false,
      });
    }
  }, [editModalOpen, petToEdit]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const birthStr = formData.birth.trim();
      if (!birthStr) {
        alert("Vui lòng nhập ngày sinh");
        return;
      }
      await handleCreatePet({
        ...formData,
        birth: birthStr,
        price: Number(formData.price) || 0,
        imageUrl: formData.imageUrl?.trim() || "",
      });
      setFormData({ name: "", species: "", breed: "", birth: "", gender: "", price: 0, vaccinated: false, imageUrl: "" });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petToEdit?.id) return;
    setEditSubmitting(true);
    try {
      const birthStr = editFormData.birth.trim();
      if (!birthStr) {
        alert("Vui lòng nhập ngày sinh");
        return;
      }
      await handleUpdatePet(petToEdit.id, {
        ...editFormData,
        birth: birthStr,
        price: editFormData.price ? Number(editFormData.price) : undefined,
        imageUrl: editFormData.imageUrl?.trim() || "",
      });
    } finally {
      setEditSubmitting(false);
    }
  };

  const confirmMarkSold = async () => {
    if (!petToMarkSold?.id) return;
    await handleMarkAsSold(petToMarkSold.id);
    closeSoldModal();
  };

  const confirmDelete = async () => {
    setDeleteSubmitting(true);
    try {
      await handleDeletePet();
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await petService.getAllPets();
      setPets(data.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load pets");
      setPets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);



  const stats = useMemo(
    () => ({
      total: pets.length,
      available: pets.filter((p) => p.available !== false).length,
    }),
    [pets]
  );

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, []);

  const openAddModal = useCallback(() => setFormModalOpen(true), []);
  const closeFormModal = useCallback(() => setFormModalOpen(false), []);

  const openEditModal = useCallback((pet: PetData) => {
    setPetToEdit(pet);
    setEditModalOpen(true);
  }, []);
  const closeEditModal = useCallback(() => {
    setEditModalOpen(false);
    setPetToEdit(null);
  }, []);

  const openSoldModal = useCallback((pet: PetData) => {
    setPetToMarkSold(pet);
    setSoldModalOpen(true);
  }, []);
  const closeSoldModal = useCallback(() => {
    setSoldModalOpen(false);
    setPetToMarkSold(null);
  }, []);

  const openDeleteModal = useCallback((pet: PetData) => {
    setPetToDelete(pet);
    setDeleteModalOpen(true);
  }, []);
  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setPetToDelete(null);
  }, []);

  const handleCreatePet = useCallback(
    async (payload: PetCreationRequest) => {
      try {
        await petService.createPet(payload);
        showToast("Thêm thú cưng thành công!", "success");
        closeFormModal();
        await fetchPets();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Thêm thất bại", "error");
        throw e;
      }
    },
    [closeFormModal, fetchPets, showToast]
  );

  const handleUpdatePet = useCallback(
    async (id: string, payload: PetUpdateRequest) => {
      try {
        await petService.updatePet(id, payload);
        showToast("Cập nhật thú cưng thành công!", "success");
        closeEditModal();
        await fetchPets();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Cập nhật thất bại", "error");
        throw e;
      }
    },
    [closeEditModal, fetchPets, showToast]
  );

  const handleMarkAsSold = useCallback(
    async (id: string) => {
      try {
        await petService.markAsSold(id);
        showToast("Đã đánh dấu đã bán!", "success");
        closeSoldModal();
        await fetchPets();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Đánh dấu thất bại", "error");
        throw e;
      }
    },
    [closeSoldModal, fetchPets, showToast]
  );

  const handleDeletePet = useCallback(async () => {
    if (!petToDelete?.id) return;
    try {
      await petService.deletePet(petToDelete.id);
      showToast("Đã xóa thú cưng!", "success");
      closeDeleteModal();
      await fetchPets();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Xóa thất bại", "error");
    }
  }, [petToDelete, closeDeleteModal, fetchPets, showToast]);
  const filteredPets = useMemo(() => {
    let result = [...pets];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name).toLowerCase().includes(q) ||
          (p.species).toLowerCase().includes(q) ||
          (p.breed).toLowerCase().includes(q) ||
          (p.gender).toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => (a.name).localeCompare(b.name));
    return result;
  }, [pets, search]);
  const handleExportPets = useCallback(() => {
    exportTableToXls({
      filename: `pets-export-${new Date().toISOString().slice(0, 10)}`,
      sheetName: "Pets",
      headers: [
        "Pet ID",
        "Name",
        "Description",
        "Image URL",
        "Species",
        "Breed",
        "Birth",
        "Gender",
        "Price",
        "Vaccinated",
      ],
      data: filteredPets.map((p) => {
        return [
          p.id,
          p.name ?? "",
          p.description ?? "",
          p.imageUrl ?? "",
          p.species ?? "",
          p.breed ?? "",
          p.birth ?? "",
          p.gender ?? "",
          p.price ?? 0,
          p.vaccinated ?? false,
        ];
        }),
      });
  }, [filteredPets]);  

  return {
    pets: filteredPets,
    allPets: pets,
    loading,
    error,
    search,
    setSearch,
    viewMode,
    setViewMode,
    stats,
    formModalOpen,
    editModalOpen,
    soldModalOpen,
    deleteModalOpen,
    petToEdit,
    petToMarkSold,
    petToDelete,
    toast,
    openAddModal,
    openEditModal,
    openSoldModal,
    closeFormModal,
    closeEditModal,
    closeSoldModal,
    openDeleteModal,
    closeDeleteModal,
    handleCreatePet,
    handleUpdatePet,
    handleMarkAsSold,
    handleDeletePet,
    fetchPets,
    handleExportPets,
    imageUploading,
    imageUploadError,
    fileInputRef,
    fileInputRefEdit,
    cloudinaryEnabled,
    formData,
    setFormData,
    editFormData,
    setEditFormData,
    handleFormSubmit,
    handleEditSubmit,
    handleImageFileChange,
    setImageUploadError,
    formSubmitting,
    editSubmitting,
    deleteSubmitting,
    confirmMarkSold,
    confirmDelete,

    showToast,
  };
}
