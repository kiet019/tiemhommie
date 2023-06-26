import { AppBar, Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import LogoTitle from "../theme/title/LogoTitle";
import NavButton from "../theme/button/NavButton";
import SearchBox from "../theme/search/SearchBox";
import { categoryList, setup } from "@/config/setup";
import CartIconButton from "../theme/button/CartIconButton";
import AccountIconButton from "../theme/button/AccountIconButton";
import { CheckInView } from "@/checkInScreen";

const Navigation1 = () => {
  const [isVisible, setIsVisible] = useState<any>(true);
  return (
      <CheckInView setIsVisible={setIsVisible}>
        <AppBar
          sx={{
            backgroundColor: setup.backgroundColor,
            paddingBottom: "0.6rem",
            boxShadow: isVisible? "none" : null
          }}
        >
          <Container maxWidth="lg">
            <div
              style={{
                display: "grid",
                marginTop: "0.5rem",
                alignItems: "center",
                gridTemplateColumns: "25% 55% 20%",
              }}
            >
              <LogoTitle />
              <Box flexGrow={1}>
                <SearchBox />
              </Box>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <AccountIconButton />
                <CartIconButton url="/cart" />
              </div>
            </div>
            <div
              style={{
                marginTop: "1rem",
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={2.5}>
                  <NavButton
                    categoryList={categoryList}
                    isVisible={isVisible}
                  />
                </Grid>
              </Grid>
            </div>
          </Container>
        </AppBar>
      </CheckInView>
  );
};

export default Navigation1;
