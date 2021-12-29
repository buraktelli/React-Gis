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
        <div>
            <Button icon="pi pi-arrow-right" onClick={() => dispatch(visibleChange(!sidebarVisibility))} className="p-mr-2" />
        </div>


    return (
        <div className='menubar'>
            <div className={`sidebar ${sidebarVisibility ? 'sidebar-opened' : 'sidebar-closed'}`}>

            </div>
            <Menubar start={start} model={[]} />
        </div>
    )
}
