import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Modal from 'react-awesome-modal';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const TambahMahasiswa = () => {
    const navigate = useNavigate();
    const [nim, setnim] = useState();
    const [nama, setnama] = useState('');
    const [jurusan, setjurusan] = useState('');
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState('');
    const [messageError, setmessageError] = useState('');
    const [messageSucces, setmessageSucces] = useState('');

    const postAdd = async () => {
        setloading(true)
        const data = {
            "nim": nim,
            "nama": nama,
            "jurusan": jurusan
        }
        try {
            const response = await fetch('http://192.168.50.8:8000/tambahMahasiswa', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const json = response.json();
            json.then((data) => {
                console.log('Data: ', data);
                if (data.errors != null) {
                    setTimeout(() => {
                        setloading(false)
                        setmessageError('Data masih ada yang kosong');
                    }, 1000);
                } else if (data.status == true) {
                    setTimeout(() => {
                        setloading(false);
                        setmessageSucces(data.message)
                    }, 2000);
                } else if (data.status == false) {
                    setTimeout(() => {
                        setloading(false);
                        setmessageError(data.message)
                    }, 2000);
                }
            })
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <div className="">
            <NavBar />
            <div className="container p-4">
                <div className="container m-2">
                    <Alert show={messageError != '' ? true : false} variant="danger" >
                        <Alert.Heading>Information!</Alert.Heading>
                        <p> {messageError} </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setmessageError('')} variant="outline-danger">
                                Tutup
                            </Button>
                        </div>
                    </Alert>
                    <Alert show={message != '' ? true : false} variant="danger" >
                        <Alert.Heading>Information!</Alert.Heading>
                        <p> {message} </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setmessage('')} variant="outline-danger">
                                Tutup
                            </Button>
                        </div>
                    </Alert>
                    <Alert show={messageSucces != '' ? true : false} variant="success" >
                        <Alert.Heading>Information!</Alert.Heading>
                        <p> {messageSucces} </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setmessageSucces('')} variant="outline-success">
                                Tutup
                            </Button>
                        </div>
                    </Alert>
                </div>
                <div className="card">
                    <div className="card-header">
                        Form Tambah Mahasiswa
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Nim</InputLabel>
                                <Input
                                    id="nim"
                                    type="number"
                                    inputProps={{ maxLength: 8 }}
                                    onChange={(event) => {
                                        setnim(event.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Nama Lengkap</InputLabel>
                                <Input
                                    id="nama"
                                    onChange={(event) => {
                                        setnama(event.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Jurusan</InputLabel>
                                <Input
                                    id="jurusan"
                                    onChange={(event) => {
                                        setjurusan(event.target.value)
                                    }}
                                />
                            </FormControl>
                        </div>
                        <div className="container mt-2">
                            <div className="d-flex justify-content-end m-2 mt-4">
                                <a href="/" className='btn btn-danger' style={{ backgroundColor: '#c62828', margin: 4 }} >BATAL</a>
                                <Button variant="contained" style={{ backgroundColor: "#2196f3", margin: 4 }} onClick={postAdd} >
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal visible={loading} width="300" height="100" effect="fadeInUp" >
                    <div style={{ display: 'flex', alignItems: 'center', width: 300, height: 100, justifyContent: 'center', flexDirection: 'column' }}>
                        <h5>Loading</h5>
                        <CircularProgress style={{ color: '#393E46' }} />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default TambahMahasiswa
