import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import SessionInterface from 'interfaces/SessionInterface';

const pages: ReadonlyArray<any> = [{ name: 'Backoffice', permissions: ['ADMIN', 'USER'] }];
const settings: ReadonlyArray<string> = ['Logout'];

function ResponsiveAppBar({ session }: SessionInterface) {
  const { t, lang } = useTranslation('common')

  const appTitle = t('AppTitle')

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    session.logout();
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" noWrap component={Link} href={"/"}
            sx={{
              mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700,
              letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
            }}>{appTitle}</Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
              aria-haspopup="true" color="inherit" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" transformOrigin={{ vertical: 'top', horizontal: 'left', }}
              anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted
              sx={{ display: { xs: 'block', md: 'none' }, }}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              {pages.map((page, index) => {

                if (page.permissions.includes(session.user.permission))
                  return (
                    <MenuItem key={index} onClick={handleCloseNavMenu} component={Link} href={'/' + page.name.toLowerCase()}>
                      <Typography textAlign="center">{t(page.name)}</Typography>
                    </MenuItem>
                  )
              })}
            </Menu>
          </Box>


          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Typography variant="h5" noWrap component={Link} href={"/"}
            sx={{
              mr: 2, display: { xs: 'flex', md: 'none' },
              flexGrow: 1, fontFamily: 'monospace', fontWeight: 700,
              letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
            }}>{appTitle}</Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (page.permissions.includes(session.user.permission))
                return (
                  <Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link} href={'/' + page.name.toLowerCase()}>
                    {t(page.name)}
                  </Button>
                )
            })}
          </Box>

          {session.user.permission
            && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={t('Open settings')}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp"// src="/static/images/avatar/2.jpg" 
                    />
                  </IconButton>
                </Tooltip>
                <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} keepMounted
                  anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                  open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>

                  {settings.map((setting) => (
                    <MenuItem key={setting.toLowerCase()} onClick={() => {
                      handleCloseUserMenu()
                      setting === "Logout" && handleLogout()
                    }
                    }>
                      <Typography textAlign="center">{t(setting)}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )
          }

          {!session.user.permission
            && (
              <Button key={"login"} component={Link} href={'/login'}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {t('Login')}
              </Button>
            )
          }


        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;