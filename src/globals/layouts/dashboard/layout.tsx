/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useLoadUser } from "@/globals/hooks/useLoadUser";
import {
  AtomAuthenticationInterface,
  Authentication,
} from "@/globals/atoms/auth";
import { setCookie } from "cookies-next";

export const SIDE_NAV_WIDTH = 289;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const reseted: AtomAuthenticationInterface = {
  isAuth: false,
  jwt: "",
  email: "",
  loginType: "",
  me: {},
};

export const DashboardLayout = (props: any) => {
  const { children } = props;
  const router = useRouter();
  let logged = useLoadUser();
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [auth, setAuth] = useRecoilState(Authentication);

  async function logout() {
    try {
      setAuth({ ...reseted });
      setCookie("jwt", undefined);
      router.push("/parceiros");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  const handlePathnameChange = useCallback(() => {
    if (openNav) setOpenNav(false);
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [pathname]);

  useEffect(() => {
    const handleLogout = async () => {
      return await logout();
    };

    if (logged === null || logged) return;
    if (logged === false) handleLogout();
  }, [logged]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} logout={logout} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};
