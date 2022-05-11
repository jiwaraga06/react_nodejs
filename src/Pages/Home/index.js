import React, { useState, useEffect } from 'react'
import { Button, CircularProgress } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Add } from '@mui/icons-material';
import Modal from 'react-awesome-modal';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const Home = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [token, settoken] = useState('');
    const [listMahasiswa, setlistMahasiswa] = useState([]);
    const [messageSuccess, setmessageSuccess] = useState('');
    const [messageError, setmessageError] = useState('');
    const [message, setmessage] = useState('');
    const getMahasiswa = async () => {
        var token_access = localStorage.getItem('token');
        try {
            const response = await fetch('http://192.168.50.8:8000/mahasiswa', {
                method: 'GET',
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token_access}`
                }
            });
            var json = response.json();
            // console.log('Json: ', json);
            json.then((data) => {
                console.log(data);
                if (data.status === 400) {
                    console.log('token tidak terdaftar');
                    setmessage(data.message)
                } else {
                    setmessage('')
                    setlistMahasiswa(data['mahasiswa']);
                }
            })
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const deleteMhs = async (id) => {
        console.log(id);
        try {
            const response = await fetch('http://192.168.50.8:8000/deleteMahasiswa', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id
                })
            });
            var json = response.json();
            json.then((data) => {
                console.log('Delete Mahasiswa: ', data);
                if (data.status === 200) {
                    setTimeout(() => {
                        setloading(false);
                        setmessageSuccess(data.message)
                        getMahasiswa();
                    }, 2000);
                } else if (data.status !== 200) {
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

    const secret = async () => {
        var token_access = localStorage.getItem('token');
        try {
            const response = await fetch('http://192.168.50.8:8000/auth/api/v1/secret', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token_access}`
                }
            });
            var json = response.json();
            console.log('Secret: ', json);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        getMahasiswa()
        secret()
        // localStorage.setItem('token', null);
        // localStorage.setItem('nama', null);
        // localStorage.setItem('id', null);
        // localStorage.setItem('namaVerif', null);
        // localStorage.setItem('emailVerif', null);
        // localStorage.setItem('passVerif', null);
    }, []);

    return (
        <div className="">
            <NavBar />
            <div className="container p-4">
                <div className="container m-2">
                    <Alert show={messageError !== '' ? true : false} variant="danger" >
                        <Alert.Heading>Information!</Alert.Heading>
                        <p> {messageError} </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setmessageError('')} variant="outline-danger">
                                Tutup
                            </Button>
                        </div>
                    </Alert>
                    <Alert show={messageSuccess !== '' ? true : false} variant="success" >
                        <Alert.Heading>Information!</Alert.Heading>
                        <p> {messageSuccess} </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setmessageSuccess('')} variant="outline-success">
                                Tutup
                            </Button>
                        </div>
                    </Alert>
                </div>
                <Modal visible={loading} width="300" height="100" effect="fadeInUp" >
                    <div style={{ display: 'flex', alignItems: 'center', width: 300, height: 100, justifyContent: 'center', flexDirection: 'column' }}>
                        <h5>Loading</h5>
                        <CircularProgress style={{ color: '#393E46' }} />
                    </div>
                </Modal>
                <div className="card">
                    <div className="card-header">
                        Data Mahasiswa
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="d-flex justify-content-end">
                                {message !== '' ?
                                    <div className="container">
                                    </div>
                                    :
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            if (token !== null) {
                                                navigate('/tambahMhs')
                                            } else {
                                                alert('Anda belum login')
                                            }
                                        }}
                                        style={{ backgroundColor: '#2196f3' }}
                                        startIcon={<Add />}>
                                        Tambah Mahasiswa
                                    </Button>}
                            </div>
                            <div className="row row-cols-4 mt-4">
                                {
                                    message !== '' ?
                                        <div className="container">
                                            <h6>Anda Belum Login</h6>
                                        </div>
                                        : listMahasiswa.map((item, index) => {
                                            return <div className="card" key={index} style={{ marginTop: 8 }} >
                                                <div className="col">
                                                    <p>{item.Nama}</p>
                                                    <p style={{ fontSize: 14 }} >{item.Jurusan}</p>
                                                    {/* <Link to={{ pathname: `/editMhs/${item.Nim}` }} className='btn btn-warning mb-2' >Edit</Link> */}
                                                    <button className='btn btn-warning mb-2' style={{ marginLeft: 2 }} onClick={() => {
                                                        if (token !== null) {
                                                            navigate(`/editMhs/${item.Nim}`)
                                                        } else {
                                                            alert('Anda belum login')
                                                        }
                                                    }} >Edit</button>
                                                    <button className='btn btn-danger mb-2' style={{ marginLeft: 2 }} onClick={() => {
                                                        if (token !== null) {
                                                            deleteMhs(item.Id)
                                                        } else {
                                                            alert('Anda belum login')
                                                        }
                                                    }} >Delete</button>
                                                </div>
                                            </div>
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
