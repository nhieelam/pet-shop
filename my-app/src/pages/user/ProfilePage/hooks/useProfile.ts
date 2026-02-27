import { useEffect, useState } from "react";
import { getMe } from "@/api/users.api";


export function useProfile() {
  const [user, setUser] = useState(null);
  
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
}
