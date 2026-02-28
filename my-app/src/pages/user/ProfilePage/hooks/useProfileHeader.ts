import { useEffect, useState } from "react";
import { getMe } from "@/api/users.api";
import { useProfile } from "./useProfile";

const { user, setUser, isEditOpen,setIsEditOpen} = useProfile();
interface UserProfile {
  id: string;
  username: string;
  phone: string;
  avatar ?: string;
  createdAt : string;
}

interface UseProfileHeaderReturn {
    user: UserProfile;
    isEditOpen: boolean;
    editName: string;
    editPhone: string;
    editAvatar: string;
    handleEditSubmit: (e: React.FormEvent) => void;
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditAvatar: React.Dispatch<React.SetStateAction<string>>;
    setEditName: React.Dispatch<React.SetStateAction<string>>;
    setEditPhone: React.Dispatch<React.SetStateAction<string>>;
}

export function useProfileHeader() : UseProfileHeaderReturn {
    const [editName, setEditName] = useState(user.username || "");
    const [editPhone, setEditPhone] = useState(user.phone || "");
    const [editAvatar, setEditAvatar] = useState(user.avatar || "");

    useEffect(() => {
    async function fetchUser() {
        try {
        const res = await getMe();
        setUser(res.data);
        } catch (err) {
        console.error("Failed to fetch user", err);
        }
    }

    fetchUser();
    }, []);

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUser({
            ...user,
            username: editName,
            phone: editPhone,
            avatar: editAvatar,
        });
        setIsEditOpen(false);
        alert("Cập nhật hồ sơ thành công!");
    };
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMe();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    }

    fetchUser();
  }, []);

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
  }
}
