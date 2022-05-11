import React, { useState, useEffect } from 'react'
import { Email, Lock, Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { Button, Card, CardContent, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import Modal from 'react-awesome-modal';
import { Box } from '@mui/system';
import { Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import NavBar from '../NavBar';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [nama, setnama] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const [errorEmail, seterrorEmail] = useState('');
    const [message, setmessage] = useState('');

    const handlePass = () => {
        setshowPassword(!showPassword);
    }
    const getToken = async () => {
        var name = localStorage.getItem('nama');
        var namaverif = localStorage.getItem('namaVerif');
        console.log(name);
        if (name != 'null') {
            navigate('/')
        } else if(namaverif != 'null'){
            navigate('/register/verifikasi')
        }
    }

    const postRegister = async () => {
        setloading(true)
        const data = {
            "nama": nama,
            "email": email,
            "password": password
        };
        console.log(data);
        try {
            const response = await fetch('http://192.168.50.8:8000/auth/api/v1/register', {
                method: 'POST',
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify(data)
            });
            var json = response.json();
            // console.log('Json: ', json);
            json.then((data) => {
                console.log('Data: ', data);
                if (data.errors != null) {
                    setloading(false)
                    seterrorEmail(data.errors[0].msg)
                } else if (data.status != null) {
                    if (data.status == 202) {
                        setloading(false)
                        setmessage(data.message);
                    } else {
                        setTimeout(() => {
                            setloading(false)
                            seterrorEmail('');
                            localStorage.setItem('namaVerif', nama);
                            localStorage.setItem('emailVerif', email);
                            localStorage.setItem('passVerif', password);
                            alert('Silahkan Verifikasi untuk Login')
                            navigate('/register/verifikasi')
                        }, 2000);
                    }
                }
            });
        } catch (error) {
            // console.log('Error: ', error);
        }
    }
    useEffect(() => {
        getToken()
    }, []);
    return (
        <section>
            <NavBar />
            <div className="container">
                <div className="d-flex justify-content-center mt-4">
                    <Card sx={{ width: 400 }}>
                        <CardContent>
                            <Typography align='center' variant='h6'>Register</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Nama</InputLabel>
                                    <Input
                                        required
                                        error={errorEmail === '' ? false : true}
                                        title="title"
                                        id="nama"
                                        name='nama'
                                        variant="standard"
                                        size='small'
                                        fullWidth={true}
                                        onChange={(event) => {
                                            setnama(event.target.value)
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 2 }}>
                                <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                                    <Input
                                        required
                                        error={errorEmail === '' ? false : true}
                                        title="title"
                                        id="email"
                                        name='email'
                                        variant="standard"
                                        size='small'
                                        fullWidth={true}
                                        onChange={(event) => {
                                            setemail(event.target.value)
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 2 }}>
                                <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        required
                                        error={errorEmail === '' ? false : true}
                                        id="password"
                                        name='password'
                                        variant="standard"
                                        size='small'
                                        fullWidth={true}
                                        onChange={(event) => {
                                            setpassword(event.target.value)
                                        }}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handlePass}
                                                    edge='end' >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>
                            <div className="d-flex justify-content-center m-2 mt-4">
                                <Button type="submit" variant="contained" fullWidth={true} style={{ backgroundColor: "#393E46" }} onClick={postRegister}>Register</Button>
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

export default Register
