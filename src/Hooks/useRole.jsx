import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const normalizeRole = (data) => {
  // supports many backend response shapes safely
  if (!data) return "user";

  // if API returns a string like "admin"
  if (typeof data === "string") return data;

  // common shapes
  if (data.role) return data.role;
  if (data.userRole) return data.userRole;
  if (data.data?.role) return data.data.role;

  return "user";
};

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadRole = async () => {
      // no user → treat as normal user
      if (!user?.email) {
        setRole("user");
        setRoleLoading(false);
        return;
      }

      setRoleLoading(true);

      try {
        const res = await fetch(
          `https://scicbackend.vercel.app/users/role/${user.email}`
        );

        // if backend returns 401/404 etc
        if (!res.ok) {
          if (!ignore) setRole("user");
          return;
        }

        const data = await res.json();

        const finalRole = normalizeRole(data);

        if (!ignore) setRole(finalRole);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        if (!ignore) setRole("user");
      } finally {
        if (!ignore) setRoleLoading(false);
      }
    };

    loadRole();

    return () => {
      ignore = true;
    };
  }, [user?.email]);

  return { role, roleLoading };
};

export default useRole;
