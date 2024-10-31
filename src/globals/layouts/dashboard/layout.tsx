/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { useRecoilState } from "recoil";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import axios from "axios";

const SIDE_NAV_WIDTH = 280;

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

export const DashboardLayout = (props: any) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  // const [userData, setUserData] = useRecoilState(UserData);
  const infosCookie = getCookie("infos1");
  const [informations, setInformations] = useState(false);
  const router = useRouter();

  const handleAction = () => {
    alert("teste");
  };

  const handlePathnameChange = useCallback(() => {
    if (openNav) setOpenNav(false);
  }, [openNav]);

  const handleLogout = async () => {
    setCookie("user", undefined);
    // setUserData(UserDataDefault);
    // await signOut(auth);
    await axios.get("/api/auth/signout");
    return await router.push("/");
  };

  // const PersistLogin = async () => {
  //   let persistance = await handlePersistLogin();
  //   if (persistance === null) return await handleLogout();
  //   return setUserData(persistance);
  // };

  useEffect(() => {
    handlePathnameChange();
  }, [pathname]);

  // useEffect(() => {
  //   PersistLogin();
  // }, []);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} logout={handleLogout} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      {/* <Fab
        color="primary"
        aria-label="add"
        title="Adicionar Paciente"
        onClick={handleAction}
        sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
      >
        <PersonAddIcon />
      </Fab> */}
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};
