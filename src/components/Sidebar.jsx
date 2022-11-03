import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Grid from "../components/Grid";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Todas", "Selecciones", "Rareza", "Especiales", "Buscar"].map(
            (text) => (
              <ListItem key={text} disablePadding>
                <Link to={`/search/${text}`} style={{ textDecoration: "none" }}>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#0077B6" }}>
                      <ArrowCircleRightSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          )}
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
