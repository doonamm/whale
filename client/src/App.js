import React from "react";
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Announce from "./components/Announce";
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {online} from './redux/actions/LoginStatus';

function App(props) {
    useEffect(()=>{
        const isOnline = localStorage.getItem('isOnline');
        if(isOnline){
            props.online();
        }
    }, []);
    return (
        <>
            <Navbar/>
            <Announce/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </>
    );
}

export default connect(null, {online})(App);
