import CloseIcon from '@mui/icons-material/Close';
import { Grid, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { React, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const handleCadastro = useCallback(() => navigate('/cadastro', { replace: true }), [navigate]);
  const handleLoggedIn = useCallback(() => navigate('/encontre-seu-altofalante', { replace: true }), [navigate]);
  const [errorNotification, setErrorNotification] = useState(false);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/login', { senha: password, usuario: user }, { headers: { 'Content-Type': 'application/json' } });
      if (response.data === "Incorreto!") {
        setErrorNotification(true);
      } else {
        handleLoggedIn();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box className="App">
      <Box className="App-header">
        <form>
          <Grid container sx={{ maxWidth: "500px" }} spacing="32px">
            <Grid item xs={12}>
              <Typography color="primary" fontSize="24px" fontWeight={600}>Protech</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField error={errorNotification} autoComplete='off' variant="filled" label="Usuário" onChange={(e) => { setErrorNotification(false); setUser(e.target.value) }} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField error={errorNotification} inputProps={{ autoComplete: 'new-password' }} autoComplete='off' variant="filled" label="Senha" onChange={(e) => { setErrorNotification(false); setPassword(e.target.value) }} fullWidth type="password" />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={handleCadastro}>Cadastrar</Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth onClick={handleLogin}>Entrar</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box sx={{ position: 'absolute', left: 16, bottom: 4 }}>
        <Collapse in={errorNotification}>
          <Alert
            color="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorNotification(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Usuário ou senha incorreto!
          </Alert>
        </Collapse>
      </Box>
    </Box>
  );
}

export default App;
