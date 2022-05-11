import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const [nama, setnama] = useState('');

    const getAccount = async () => {
        var id = localStorage.getItem('id');
        var token_access = localStorage.getItem('token');
        try {
            const response = await fetch(`http://192.168.50.8:8000/auth/api/v1/getAccount/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token_access}`
                }
            });
            var json = response.json();
            // console.log('Account: ', json);
            json.then((data) => {
                if (data.status == 300) {
                    setnama(data.data.nama);
                } else {
                    setnama('');
                }
            })
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const logout = async () => {
        var id = localStorage.getItem('id')
        var token_access = localStorage.getItem('token');
        const data = {
            'id_account': id,
            'token': token_access
        }
        try {
            const response = await fetch('http://192.168.50.8:8000/auth/api/v1/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            var json = response.json();
            console.log('Logout: '.json);
            json.then((data) => {
                if (data.status == true) {
                    localStorage.setItem('token', null);
                    localStorage.setItem('nama', null);
                    localStorage.setItem('id', null);
                    getAccount();
                    navigate('/login');
                }
            })
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        getAccount();
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary ">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Dashboard</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <div className="d-flex">
                        {
                            nama !== '' ?
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#eeeeee', borderColor: '#eeeeee', color: 'black' }} >
                                        {nama}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { logout() }} >Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                :
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#eeeeee', borderColor: '#eeeeee', color: 'black' }} >
                                        Account
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                                        <Dropdown.Item href="/register">Register</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
