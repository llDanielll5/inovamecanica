// hooks/useLoadUser.ts

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { AtomAuthenticationInterface, Authentication } from "../atoms/auth";
import { ROUTES } from "../requests/routes";
import axiosInstance from "../requests/axios";

export const useLoadUser = () => {
  const router = useRouter();
  const setAuth = useSetRecoilState(Authentication);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const reseted: AtomAuthenticationInterface = {
    isAuth: false,
    jwt: "",
    email: "",
    loginType: "",
    me: {},
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance(ROUTES.ENTERPRISE.ME);
        if (data) {
          setIsLogged(true);
          setAuth((prev) => ({ ...prev, me: data }));
        } else {
          setIsLogged(false);
          setAuth({ ...reseted });
        }
      } catch (error) {
        setIsLogged(false);
        setAuth({ ...reseted });
        console.error("Failed to load user:", error);
      }
    };

    fetchUser();
  }, [setAuth]);

  return isLogged;
};
