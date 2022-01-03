import React from 'react';
import './App.scss';
import BodyComponent from './components/body/BodyComponent';
import Navbar from './components/navbar/Navbar';
import SidebarComponent from './components/sidebar/SidebarComponent';
import { useAppDispatch, useAppSelector } from './state/store'

function App() {
  const sidebarVisibility = useAppSelector((state) => state.sidebar.visibility)


  return (
    <div className="App">
      <Navbar></Navbar>
      <div className='body'>
        {
          sidebarVisibility ?
            <SidebarComponent></SidebarComponent> : ''
        }
        <div className='main-content'>
          <BodyComponent></BodyComponent>
        </div>
      </div>
    </div>
  );
}

export default App;
