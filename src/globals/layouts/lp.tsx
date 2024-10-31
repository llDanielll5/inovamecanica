import React, { useEffect, useState } from "react";
import HeaderLp from "../_components/lp/header";
import HeadLanding from "../_components/custom-head";
import useWindowSize from "../hooks/useWindowSize";
import { Box } from "@mui/material";

const LandingPageLayout = (props: any) => {
  const { children } = props;
  const { width } = useWindowSize();
  const [title, setTitle] = useState("");
  // const [userData, setUserData] = useRecoilState(UserData);

  const handlePersistLogin = async () => {};

  // useEffect(() => {
  //   handlePersistLogin();
  // }, []);

  return (
    <Box>
      <HeadLanding />
      <HeaderLp />
      {children}
      {/* <BuyInfosLp />
      <FooterLp />  */}
    </Box>
  );
};

export default LandingPageLayout;
