import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem("TOKEN");

    function logout() {
        localStorage.clear();
        navigate('/')
      }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Survey Details
          </Typography>
          {token ? (
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Show Previous Survey</Button>
                        </>
                    )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}