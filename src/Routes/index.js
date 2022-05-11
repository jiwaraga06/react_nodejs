import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditMahasiswa from '../Pages/EditMahasiswa';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import TambahMahasiswa from '../Pages/TambahMahasiswa';
import Verifikasi from '../Pages/Verifikasi';

const PageRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} >
                </Route>
                <Route path="/login" element={<Login />} >
                </Route>
                <Route path="/register" element={<Register />} >
                </Route>
                <Route path="/register/verifikasi" element={<Verifikasi />} >
                </Route>
                <Route path="/tambahMhs" element={<TambahMahasiswa />} >
                </Route>
                <Route path="/editMhs/:id" element={<EditMahasiswa />} >
                </Route>
            </Routes>
        </Router>
    )
}

export default PageRoute
