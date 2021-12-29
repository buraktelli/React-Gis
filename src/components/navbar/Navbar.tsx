import React, { useState } from 'react'
import './Navbar.scss';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { visibleChange } from '../../state/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'

export default function Navbar() {
    const sidebarVisibility = useAppSelector((state) => state.sidebar.visibility)
    const dispatch = useAppDispatch()

    const start =
        <div className='start'>
            {
                !sidebarVisibility ?
                    <Button
                        icon="pi pi-angle-double-right"
                        onClick={() => dispatch(visibleChange(!sidebarVisibility))}
                        style={{ marginRight: '5px' }}
                    /> : ''
            }
            <div className='measure-group'>
                <Button
                    style={{
                        marginRight: '5px',
                        backgroundColor: '#2a2c38',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img src="icons/measurement.svg" />
                </Button>
                <Button
                    style={{
                        marginRight: '5px',
                        backgroundColor: '#2a2c38',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img src="icons/measurement.svg" />
                </Button>
                <Button
                    style={{
                        marginRight: '5px',
                        backgroundColor: '#2a2c38',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img src="icons/measurement.svg" />
                </Button>
                <Button
                    style={{
                        marginRight: '5px',
                        backgroundColor: '#2a2c38',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img src="icons/measurement.svg" />
                </Button>
            </div>
        </div >


    return (
        <div className='menubar'>
            <div className={`sidebar ${sidebarVisibility ? 'sidebar-opened' : 'sidebar-closed'}`} />

            <Menubar start={start} model={[]} />

        </div>
    )
}
