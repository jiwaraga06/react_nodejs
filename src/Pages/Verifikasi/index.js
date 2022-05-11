import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import Modal from 'react-awesome-modal';
import { Box } from '@mui/system';
import { Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import NavBar from '../NavBar';

const Verifikasi = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [token, settoken] = useState(0);
    const [error, seterror] = useState('');
    const [message, setmessage] = useState('');

    const verif = async () => {
        var nama = localStorage.getItem('namaVerif')
        var email = localStorage.getItem('emailVerif')
        var password = localStorage.getItem('passVerif')
        var data = {
            "nama": nama,
            "email": email,
            "password": password,
            "pin": token
        }
        try {
            const response = await fetch('http://192.168.50.8:8000/auth/api/v1/verifikasi', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            var json = response.json();
            console.log('Verifikasi: ', json);
            json.then((data) => {
                if (data.status == 100) {
                    alert(data.message)
                } else if (data.status == 200) {
                    localStorage.setItem('namaVerif', null);
                    localStorage.setItem('emailVerif', null);
                    localStorage.setItem('passVerif', null);
                    alert(data.message)
                    navigate('/login')
                }
            })
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <section>
            <NavBar />
            <div className="container">
                <div className="d-flex justify-content-center mt-4">
                    <Card sx={{ width: 400 }}>
                        <CardContent>
                            <Typography align='center' variant='h6'>Verifikasi</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 2 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Masukan Token</InputLabel>
                                    <Input
                                        required
                                        error={error === '' ? false : true}
                                        title="title"
                                        id="token"
                                        name='token'
                                        variant="standard"
                                        size='small'
                                        fullWidth={true}
                                        onChange={(event) => {
                                            settoken(event.target.value)
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <div className="d-flex justify-content-center m-2 mt-4">
                                <Button type="submit" variant="contained" fullWidth={true} style={{ backgroundColor: "#393E46" }} onClick={verif} >Verifikasi Token</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Alert show={message !== '' ? true : false} variant="danger" >
                    <Alert.Heading>Information!</Alert.Heading>
                    <p> {message} </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setmessage('')} variant="outline-success">
                            Tutup
                        </Button>
                    </div>
                </Alert>
                <Modal visible={loading} width="300" height="100" effect="fadeInUp">
                    <div style={{ display: 'flex', alignItems: 'center', width: 300, height: 100, justifyContent: 'center', flexDirection: 'column' }}>
                        <h5>Loading</h5>
                        <CircularProgress style={{ color: '#393E46' }} />
                    </div>
                </Modal>
            </div>
        </section>
    )
}

export default Verifikasi
