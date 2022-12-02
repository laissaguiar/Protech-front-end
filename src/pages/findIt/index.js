import { Button, Grid, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));


function FindIt() {
    const navigate = useNavigate();

    const [tamanho, setTamanho] = React.useState(null);
    const [prioridade, setPrioridade] = React.useState(null);
    const [alcance, setAlcance] = React.useState(null);
    const [impiedancia, setImpiedancia] = React.useState(null);
    const [altofalante, setAltofalante] = React.useState("");
    const handleBackToLogin = useCallback(() => navigate('/', { replace: true }), [navigate]);
    const [link, setLink] = React.useState("");

    const handleFindItAgain = () => {
        setAltofalante("");
        setTamanho(null);
        setPrioridade(null);
        setImpiedancia(null);
        setAlcance(null);
    }

    useEffect(() => {
        console.log("alo", altofalante);
        if (altofalante === "Mg 220") {
            setLink("https://m.magazineluiza.com.br/par-de-medios-protech-mg220-6-polegadas-4-ohms-220wrms-440w/p/ekba7edg3e/rc/rcnm/");
        } else if (altofalante === "Mid bass") {
            setLink("https://somautomotivobr.com.br/alto-falante-protech-mid-bass-160-rms-6-polegadas-id8221/");
        } else if (altofalante === "Excursion 550") {
            setLink("https://produto.mercadolivre.com.br/MLB-2704503050-subwoofer-protech-excursion-550-wrms-12-pol-simples-4-ohms-_JM?matt_tool=18956390&matt_tool=34955704&matt_word=Default_URL_MLB&matt_source=google&matt_campaign_id=10771947278&matt_ad_group_id=110175121350&matt_match_type=&matt_network=g&matt_device=m&matt_creative=465351536579&matt_keyword=&matt_ad_position=&matt_ad_type=&matt_merchant_id=&matt_product_id=&matt_product_partition_id=&matt_target_id=dsa-394624151036&gbraid=0AAAAAD93qcBdvGKRH_vPXnAAeO-1T3C4e&gclid=Cj0KCQiA4aacBhCUARIsAI55maFrP1aSGBKWxQkjlR8f3sW87_MMDjCGv5Hr9z_U-8tWV2MCLDV4z5gaAoHIEALw_wcB");
        } else if (altofalante === "Maximus") {
            setLink("https://somautomotivobr.com.br/alto-falante-protech-maximus-1900-rms-15-polegadas-id9421/");
        } else if (altofalante === "Competiton") {
            setLink("https://produto.mercadolivre.com.br/MLB-2704725992-subwoofer-protech-competition-2000wrms-15-bobina-dupla-2-ohm-_JM?searchVariation=174756580271&skipInApp=true");
        } else if (altofalante === "Light") {
            setLink("https://somautomotivobr.com.br/alto-falante-subwoofer-protech-light-450-rms-8-polegadas-id4860/");
        } else {
            setLink("https://produto.mercadolivre.com.br/MLB-759655185-protech-sub-52k-18-2600wrms-_JM?skipInApp=true");
        }

    }, [altofalante]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3333/altofalantes/find-it', { params: { tamanho, prioridade, alcance, impiedancia } }, { headers: { 'Content-Type': 'application/json' } });
            if (response.data.length === 0) {
                console.log('not found');
            } else {
                setAltofalante(response.data[0].nome);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (tamanho === "6") {
            setAlcance('lugares fechados');
        }
        else if (tamanho === "12" || tamanho === "15" || tamanho === "18") {
            setPrioridade("grave");
            if (tamanho === "18") {
                setAlcance('lugares abertos');
            }
        }
    }, [tamanho]);

    return (
        <Box className="App">
            <Box className="App-header">
                <Grid container sx={{ maxWidth: "500px" }} spacing="32px" display={altofalante === "" ? "inherit" : "none"}>
                    <Grid item xs={12}>
                        <Typography color="primary" fontSize="20px" fontWeight={600}>Bem vindo!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" fontSize="20px" fontWeight={600}>Encontre seu altofalante!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Item key={1} elevation={1} sx={{ padding: "16px" }}>
                            <Typography>Tamanho</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={tamanho}
                                    onChange={e => setTamanho(e.target.value)}
                                >
                                    <FormControlLabel value="6" control={<Radio />} label="6" />
                                    <FormControlLabel value="8" control={<Radio />} label="8" />
                                    <FormControlLabel value="12" control={<Radio />} label="12" />
                                    <FormControlLabel value="15" control={<Radio />} label="15" />
                                    <FormControlLabel value="18" control={<Radio />} label="18" />
                                </RadioGroup>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item key={1} elevation={1} sx={{ padding: "16px" }}>
                            <Typography>Prioridade</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={prioridade}
                                    onChange={e => setPrioridade(e.target.value)}
                                >
                                    <FormControlLabel disabled={tamanho === "12" || tamanho === "15" || tamanho === "18"} value="voz" control={<Radio />} label="Voz" />
                                    <FormControlLabel value="grave" control={<Radio />} label="Grave" />
                                </RadioGroup>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item key={1} elevation={1} sx={{ padding: "16px" }}>
                            <Typography>Alcance</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={alcance}
                                    onChange={e => setAlcance(e.target.value)}
                                >
                                    <FormControlLabel disabled={tamanho === "18"} value="lugares fechados" control={<Radio />} label="Lugares fechados" />
                                    <FormControlLabel disabled={tamanho === "6"} value="lugares abertos" control={<Radio />} label="Lugares abertos" />
                                </RadioGroup>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item key={1} elevation={1} sx={{ padding: "16px" }}>
                            <Typography>Impiedancia</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={impiedancia}
                                    onChange={e => setImpiedancia(e.target.value)}
                                >
                                    <FormControlLabel value="4 ohms" control={<Radio />} label="4 ohms" />
                                    <FormControlLabel value="2 ohms" control={<Radio />} label="2 ohms" />
                                    <FormControlLabel value="8 ohms" control={<Radio />} label="8 ohms" />
                                </RadioGroup>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth onClick={handleBackToLogin}>Logout</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth onClick={handleSubmit} disabled={tamanho === null || prioridade === null || alcance === null || impiedancia === null}>Encontrar</Button>
                    </Grid>
                </Grid>

                <Grid container sx={{ maxWidth: "500px" }} spacing="32px" display={altofalante === "" ? "none" : "inherit"}>
                    <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                        <Typography color="primary" fontSize="20px" fontWeight={600}>{altofalante}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                window.open(link);
                            }}
                        >
                            Comprar
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleFindItAgain} >Encontrar novamente</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={handleBackToLogin}>Logout</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}

export default FindIt;
