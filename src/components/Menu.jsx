import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, Box } from '@mui/material';

const Menu = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: 200,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
    }}
  >
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem button component={Link} to="/app/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/app/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/app/settings">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  </Drawer>
);

export default Menu;