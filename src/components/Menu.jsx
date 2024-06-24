import React, { useState } from "react";
import {
  List,
  ListItemText,
  Drawer,
  Box,
  ListItemButton,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { t, i18n } = useTranslation();

  const [selectedMenu, setSelectedMenu] = useState(0);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const handleListItemClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
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
            to="/app/dashboard"
            selected={selectedMenu === 0}
            onClick={(event) => handleListItemClick(0)}
          >
            <ListItemText primary={t("dashboard")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/customers"
            selected={selectedMenu === 1}
            onClick={(event) => handleListItemClick(1)}
          >
            <ListItemText primary={t("customers")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/loans"
            selected={selectedMenu === 2}
            onClick={(event) => handleListItemClick(2)}
          >
            <ListItemText primary={t("loans")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/profile"
            selected={selectedMenu === 3}
            onClick={(event) => handleListItemClick(3)}
          >
            <ListItemText primary={t("profile")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/settings"
            selected={selectedMenu === 4}
            onClick={(event) => handleListItemClick(4)}
          >
            <ListItemText primary={t("settings")} />
          </ListItemButton>
        </List>
      </Box>
      <Box
        position={"absolute"}
        bottom={0}
        display={"flex"}
        paddingInline={1}
        gap={1}
        width={"100%"}
      >
        <Button onClick={() => changeLanguage("en")}>English</Button>
        <Button onClick={() => changeLanguage("ta")}>Tamil</Button>
      </Box>
    </Drawer>
  );
};

export default Menu;
