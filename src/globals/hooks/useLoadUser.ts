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
          setAuth((prev) => ({ ...prev, me: data }));
          setIsLogged(true);
        } else {
          setAuth({ ...reseted });
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        setAuth({ ...reseted });
        setIsLogged(false);
      }
    };

    fetchUser();
  }, [setAuth]);

  return isLogged;
};
