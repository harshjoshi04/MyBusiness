import useUser from "@/context/useUser";
import API from "@/lib/apiRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useGetUser = () => {
  const { data: session } = useSession();
  const { userData, setUserData } = useUser();
  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        if (userData) return;
        const { data } = await axios.get(`${API.USER}?id=${session.user.id}`);
        setUserData(data.data);
      } catch (er) {}
    })();
  }, [session?.user]);
};

export default useGetUser;
