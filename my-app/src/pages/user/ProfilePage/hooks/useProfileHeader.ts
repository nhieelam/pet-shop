import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useProfile } from "./useProfile";

interface UserProfile {
  id: string;
  username: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

interface UseProfileHeaderReturn {
  user: UserProfile;
  isEditOpen: boolean;
  editName: string;
  editPhone: string;
  editAvatar: string;
  handleEditSubmit: (e: React.FormEvent) => void;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  setEditAvatar: Dispatch<SetStateAction<string>>;
  setEditName: Dispatch<SetStateAction<string>>;
  setEditPhone: Dispatch<SetStateAction<string>>;
}

export function useProfileHeader(): UseProfileHeaderReturn {

  const { user, setUser, isEditOpen, setIsEditOpen } = useProfile();

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAvatar, setEditAvatar] = useState("");


  useEffect(() => {
    setEditName(user.username ?? "");
    setEditPhone(user.phone ?? "");
    setEditAvatar(user.avatar ?? "");
  }, [user.username, user.phone, user.avatar]);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUser((prev) => ({
      ...prev,
      username: editName,
      phone: editPhone,
      avatar: editAvatar,
    }));

    setIsEditOpen(false);
    alert("Cập nhật hồ sơ thành công!");
  };

  return {
    user,
    isEditOpen,
    editName,
    editPhone,
    editAvatar,
    handleEditSubmit,
    setIsEditOpen,
    setEditAvatar,
    setEditName,
    setEditPhone,
  };
}