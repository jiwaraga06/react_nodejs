import React, { useState, useEffect } from 'react'
import { Button, CircularProgress, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Modal from 'react-awesome-modal';
import { Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar';

const EditMahasiswa = () => {
    const param = useParams();
    const navigate = useNavigate();
    const [id, setid] = useState(0);
    const [nim, setnim] = useState();
    const [nama, setnama] = useState('');
    const [jurusan, setjurusan] = useState('');
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState('');
    const [messageError, setmessageError] = useState('');
    const [messageSucces, setmessageSucces] = useState('');

    const getByNim = async () => {
        try {
            const response = await fetch(`http://192.168.50.8:8000/MahasiswaByName/${param.id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            var json = response.json();
            json.then((data) => {
                console.log('By Nim: ', data);
                setid(data.data.id);
                setnim(data.data.nim);
                setnama(data.data.nama);
                setjurusan(data.data.jurusan);
            })
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const updateMhs = async () => {
        setloading(true);
        const data = {
            "id": id,
            "nim": nim,
            "nama": nama,
            "jurusan": jurusan
        }
        try {
            const response = await fetch('http://192.168.50.8:8000/updateMahasiswa', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            var json = response.json();
            json.then((data) => {
                if (data.status == 200) {
                    setTimeout(() => {
                        setloading(false);
                        setmessageSucces(data.message)
                    }, 2000);
                } else if (data.status != 200) {
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

    useEffect(() => {
        getByNim()
    }, []);

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
                        Form Edit Mahasiswa
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                {/* <InputLabel htmlFor="standard-adornment-amount">Nim</InputLabel> */}
                                <Input
                                    placeholder='Nim'
                                    value={nim}
                                    id="nim"
                                    type="number"
                                    onChange={(event) => {
                                        setnim(event.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                {/* <InputLabel htmlFor="standard-adornment-amount">Nama Lengkap</InputLabel> */}
                                <Input
                                    value={nama}
                                    placeholder='Nama Lengkap'
                                    id="nama"
                                    onChange={(event) => {
                                        setnama(event.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                {/* <InputLabel htmlFor="standard-adornment-amount">Jurusan</InputLabel> */}
                                <Input
                                    value={jurusan}
                                    placeholder='Jurusan'
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
                                <Button variant="contained" style={{ backgroundColor: "#2196f3", margin: 4 }} onClick={updateMhs} >
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

export default EditMahasiswa
