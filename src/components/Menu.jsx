import React, { useEffect, useState } from "react";
import {
  List,
  ListItemText,
  Drawer,
  Box,
  ListItemButton,
  Typography,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Menu = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(location.pathname);
  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const handleListItemClick = (index) => {
    setSelectedMenu(index);
  };
  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location.pathname]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        flexBasis: "max(200px,15vw)",
        [`& .MuiDrawer-paper`]: {
          boxSizing: "border-box",
          width: "max(200px,15vw)",
        },
        height: "100vh",
      }}
      position={"relative"}
    >
      <Box padding={2}>
        <Typography variant="h5">Money Lending</Typography>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton
            component={Link}
            to="dashboard"
            selected={selectedMenu.includes("dashboard")}
            onClick={(event) => handleListItemClick("dashboard")}
          >
            <ListItemText primary={t("dashboard")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="customers"
            selected={selectedMenu.includes("customers")}
            onClick={(event) => handleListItemClick("customers")}
          >
            <ListItemText primary={t("customers")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/loans"
            selected={selectedMenu.includes("loans")}
            onClick={(event) => handleListItemClick("loans")}
          >
            <ListItemText primary={t("loans")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/profile"
            selected={selectedMenu.includes("profile")}
            onClick={(event) => handleListItemClick("profile")}
          >
            <ListItemText primary={t("profile")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/settings"
            selected={selectedMenu.includes("settings")}
            onClick={(event) => handleListItemClick("settings")}
          >
            <ListItemText primary={t("settings")} />
          </ListItemButton>
        </List>
      </Box>
      <Box position={"absolute"} bottom={0} width={"100%"}>
        <Box padding={1}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => dispatch(logout())}
          >
            {t("logout")}
          </Button>
        </Box>
        <Box
          display={"flex"}
          paddingInline={1}
          gap={1}
          width={"100%"}
          padding={1}
        >
          <Box flexBasis={"50%"}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => changeLanguage("en")}
            >
              English
            </Button>
          </Box>
          <Box flexBasis={"50%"}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => changeLanguage("ta")}
            >
              Tamil
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Menu;
