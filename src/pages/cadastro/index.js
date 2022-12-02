import CloseIcon from '@mui/icons-material/Close';
import { Grid, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

function Cadastro() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorNotification, setErrorNotification] = useState(false);
    const [errorText, setErrorText] = useState("");
    const handleBackToLogin = useCallback(() => navigate('/', { replace: true }), [navigate]);
    const handleLoggedIn = useCallback(() => navigate('/encontre-seu-altofalante', { replace: true }), [navigate]);

    const handleCadastro = async () => {
        if (password !== confirmPassword) {
            setErrorNotification(true);
            setErrorText('Senhas diferentes!');
        } else {
            try {
                const response = await axios.post('http://localhost:3333/cadastro', { senha: password, usuario: user, nome: name }, { headers: { 'Content-Type': 'application/json' } });
                console.log(response);
                if (response.data === "Usuário já existe.") {
                    setErrorNotification(true);
                    setErrorText(response.data);
                } else {
                    handleLoggedIn();
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <Box className="App">
            <Box className="App-header">
                <Grid container sx={{ maxWidth: "500px" }} spacing="32px">
                    <Grid item xs={12}>
                        <Typography color="primary" fontSize="20px" fontWeight={600}>Cadastro de usuário</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="name" variant="filled" label="Nome" fullWidth onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={errorNotification && errorText === "Usuário já existe."} id="username" variant="filled" label="Usuário" fullWidth onChange={(e) => {
                            setUser(e.target.value);
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={errorNotification && errorText === "Senhas diferentes!"} type="password" variant="filled" label="Senha" fullWidth onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorNotification(false);
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={errorNotification && errorText === "Senhas diferentes!"} type="password" variant="filled" label="Confirmar senha" fullWidth onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            setErrorNotification(false);
                        }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth onClick={handleBackToLogin}>Voltar</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth onClick={handleCadastro}>Cadastrar</Button>
                    </Grid>
                </Grid>

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
                            {errorText}
                        </Alert>
                    </Collapse>
                </Box>
            </Box>
        </Box>
    );
}

export default Cadastro;
