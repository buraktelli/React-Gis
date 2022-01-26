import React, { useEffect } from 'react';
import './App.scss';
import BodyComponent from './components/body/BodyComponent';
import Navbar from './components/navbar/Navbar';
import SidebarComponent from './components/sidebar/SidebarComponent';
import { useAppDispatch, useAppSelector } from './state/store'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/Login';
import { dimensionsChange } from './state/features/dimensionsSlice'
import { fullScreenModeChange, Mode } from './state/features/fullScreenSlice';


function App() {
  const isAuthenticated = useAppSelector((state) => state.authenticated.isAuthenticated)
  const dispatch = useAppDispatch()

  useEffect(() => {
    function handleResize() {
      dispatch(dimensionsChange({
        width: window.innerWidth,
        height: window.innerHeight
      }))
      dispatch(fullScreenModeChange(
        window.innerWidth > 580 ? Mode.BOTH : Mode.MAP
      ))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
