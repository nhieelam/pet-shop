import { useEffect, useState } from "react";
import { getMe } from "@/api/users.api";

interface UserProfile {
  id: string;
  username: string;
  phone: string;
  avatar ?: string;
  createdAt : string;
}
interface UseProfileHeaderReturn {
    user: UserProfile;
    setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
    isEditOpen: boolean;
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useProfile() : UseProfileHeaderReturn {
    const [user, setUser] = useState<UserProfile>({
        id: "",
        username: "",
        phone: "",
        avatar: "",
        createdAt : "",
    });
    const [isEditOpen, setIsEditOpen] = useState(false);

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
    setUser,
    isEditOpen,
    setIsEditOpen,
  }
}
