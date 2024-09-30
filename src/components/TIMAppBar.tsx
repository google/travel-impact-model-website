// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import CalculateIcon from "@mui/icons-material/Calculate";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import Button from "@mui/material/Button";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
  useScrollTrigger,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import "./TIMAppBar.scss";

type Props = {
  variant: "background-image" | "background-none";
};

const pages = [
  { link: "/", text: "Home", icon: <HomeIcon /> },
  { link: "/about-tim", text: "About", icon: <InfoIcon /> },
  { link: "/governance", text: "Governance", icon: <InfoIcon /> },
  { link: "/lookup/flight", text: "Emissions Calculator", icon: <CalculateIcon /> },
  { link: "/faq", text: "FAQ", icon: <QuizIcon /> },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function DrawerList() {
  return (
    <List>
      {pages.map((page, index) => {
        return (
          <ListItemButton href={page.link} sx={{ paddingRight: "24px" }} key={index}>
            <ListItemIcon sx={{ minWidth: "46px" }}>{page.icon}</ListItemIcon>
            <ListItemText primary={page.text} />
          </ListItemButton>
        );
      })}
    </List>
  );
}

function MenuDrawer({ variant }: Props) {
  const [drawerState, setDrawerState] = React.useState(false);
  const trigger = useScrollTrigger();
  const menuicon_color = variant === "background-image" && !trigger ? "secondary" : "primary";

  return (
    <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "flex-end", flexGrow: 1 }}>
      <IconButton
        size="large"
        edge="start"
        color={menuicon_color}
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setDrawerState(true)}>
        <MenuIcon />
      </IconButton>
      <Box>
        <Drawer anchor="right" open={drawerState} onClose={() => setDrawerState(false)}>
          <DrawerHeader>
            <IconButton
              aria-label="close menu"
              onClick={() => setDrawerState(false)}
              sx={{ margin: "12px 8px" }}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <DrawerList />
        </Drawer>
      </Box>
    </Box>
  );
}

// If background image, set to transparent appbar at load and during scroll,
// change to white background and black text.
// If no background image, set to white background and black text.
function TIMAppBar({ variant }: Props) {
  const trigger = useScrollTrigger();
  const appbar_color = variant === "background-image" && !trigger ? "transparent" : "#FFFFFF";
  const appbar_textcolor =
    variant === "background-image" && !trigger ? "text.secondary" : "text.primary";
  const appbar_position = variant === "background-image" && trigger ? "sticky" : "static";

  return (
    <AppBar
      position={appbar_position}
      color="primary"
      sx={{
        backgroundColor: appbar_color,
        boxShadow: "none",
      }}>
      <Toolbar>
        <IconButton href="/">
          <Typography variant="h6" component="div" color={appbar_textcolor}>
            TIM
          </Typography>
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "flex-end", flexGrow: 1 }}>
          {pages.map((page) => (
            <Button
              className="appbar-link"
              key={page.text}
              href={page.link}
              sx={{ color: appbar_textcolor }}>
              {page.text}
            </Button>
          ))}
        </Box>
        <MenuDrawer variant={variant} />
      </Toolbar>
    </AppBar>
  );
}

export default TIMAppBar;
