import React, { useEffect } from 'react';
import './App.scss';
import BodyComponent from './components/body/BodyComponent';
import Navbar from './components/navbar/Navbar';
import SidebarComponent from './components/sidebar/SidebarComponent';
import { useAppDispatch, useAppSelector } from './state/store'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/Login';


function App() {
  const sidebarVisibility = useAppSelector((state) => state.sidebar.visibility)
  const isAuthenticated = useAppSelector((state) => state.authenticated.isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          isAuthenticated ?
            <div className="App">
              <Navbar ></Navbar>
              <div className='body'>
                <SidebarComponent></SidebarComponent>
                <div className='main-content'>
                  <BodyComponent></BodyComponent>
                </div>
              </div>
            </div> :
            <Navigate
              to={{
                pathname: "/login",
              }}
            />
        } />

        <Route path="login" element={
          !isAuthenticated ?
            <Login /> :
            <Navigate
              to={{
                pathname: "/",
              }}
            />
        } />
        <Route path="*" element={
          <Navigate
            to={{
              pathname: "/login",
            }}
          />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
