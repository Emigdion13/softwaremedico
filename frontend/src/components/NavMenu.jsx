import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

function NavMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open) => {
    setDrawerOpen(open)
  }

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Pacientes', path: '/patients' },
    { text: 'Doctores', path: '/doctors' },
    { text: 'Citas', path: '/appointments' },
    { text: 'Historias Médicas', path: '/medical-records' },
  ]

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon sx={{ mr: 2, display: { xs: 'block', md: 'none' } }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Software Médico
          </Typography>
          <Button color="inherit" sx={{ display: { xs: 'block', md: 'none' } }} onClick={toggleDrawer(true)}>
            Menú
          </Button>
          <div sx={{ display: { xs: 'none', md: 'flex', gap: 2 } }}>
            {menuItems.map((item) => (
              <Button color="inherit" key={item.path} component={Link} to={item.path}>
                {item.text}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem button key={item.path} component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default NavMenu
