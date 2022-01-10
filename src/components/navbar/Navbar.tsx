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
import { tableVisibleChange } from '../../state/features/tableSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import ToolButton from '../../ui-components/ToolButton';
import { useTranslation } from 'react-i18next';
import Language from '../util/Language';

export default function Navbar() {
    const { t } = useTranslation();

    const sidebarVisibility = useAppSelector((state) => state.sidebar.visibility)
    const tableVisibility = useAppSelector((state) => state.table.visibility)
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
            {
                sidebarVisibility ?
                    <Button
                        icon="pi pi-angle-double-left"
                        onClick={() => dispatch(visibleChange(!sidebarVisibility))}
                        style={{ marginRight: '5px' }}
                    /> : ''
            }
            <div className='measure-group'>
                <ToolButton
                    svg='icons/measurement.svg'
                />
                <ToolButton
                    svg='icons/measurement.svg'
                />
                <ToolButton
                    svg='icons/measurement.svg'
                />
            </div>
            <div className='measure-group'>
                <ToolButton
                    svg='icons/table.svg'
                    onClick={() => dispatch(tableVisibleChange(!tableVisibility))}
                />
            </div>
        </div >
    const end =
        <div>
            <Language></Language>
        </div>


    return (
        <div className='menubar'>
            {/* <div className={`sidebar ${sidebarVisibility ? 'sidebar-opened' : 'sidebar-closed'}`} /> */}
            <Menubar start={start} end={end} model={[]} />
        </div>
    )
}
