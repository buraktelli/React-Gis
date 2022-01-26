import React, { useEffect, useState } from 'react'
import './Navbar.scss';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { visibleChange } from '../../state/features/sidebarSlice'
import { tableVisibleChange } from '../../state/features/tableSlice'
import { authenticatedChange } from '../../state/features/authenticatedSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import ToolButton from '../../ui-components/ToolButton';
import { useTranslation } from 'react-i18next';
import Language from '../util/language/Language';
import { Dialog } from 'primereact/dialog';

export default function Navbar() {
    const { t } = useTranslation();
    const [displayDialog, setDisplayDialog] = useState(false);

    const dialogVisibleChange = () => {
        setDisplayDialog(!displayDialog)
    }

    const end =
        <div className='end-group'>
            <Language></Language>
            <Button
                onClick={() => dispatch(authenticatedChange(false))}
                label={
                    t('BUTTON.Logout')
                }
                style={{
                    marginLeft: '5px',
                    backgroundColor: '#2a2c38',
                    width: '115px',
                    height: '45px',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            />
        </div>
    const responsiveEnd =
        <div className='end-group'>
            <ToolButton
                icon='pi-bars'
                onClick={dialogVisibleChange}
            />
        </div>

    const sidebarVisibility = useAppSelector((state) => state.sidebar.visibility)
    const tableVisibility = useAppSelector((state) => state.table.visibility)
    const isAuthenticated = useAppSelector((state) => state.authenticated.isAuthenticated)
    const { width, height } = useAppSelector((state) => state.dimensions)
    const [endStyle, setEndStyle] = useState(width > 580 ? end : responsiveEnd)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (width > 580) {
            setEndStyle(end)
        } else {
            setEndStyle(responsiveEnd)
        }
        return () => { }
    }, [width, t])

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
                {
                    width > 580 ?
                        <ToolButton
                            svg='icons/table.svg'
                            onClick={() => dispatch(tableVisibleChange(!tableVisibility))}
                        /> : <></>
                }
            </div>
        </div >
    const onHide = () => {
        setDisplayDialog(!displayDialog)
    }


    return (
        <div className='menubar'>
            {/* <div className={`sidebar ${sidebarVisibility ? 'sidebar-opened' : 'sidebar-closed'}`} /> */}
            <Menubar start={start} end={endStyle} model={[]} />

            <Dialog
                header={t('BUTTON.Settings')}
                visible={displayDialog}
                position={'top-right'}
                modal
                style={{ width: '35vw' }}
                onHide={() => onHide()}
                draggable={false} resizable={false}
            >
                <div className='dialog-content'>
                    <Language></Language>
                    <Button
                        onClick={() => dispatch(authenticatedChange(false))}
                        label={
                            t('BUTTON.Logout')
                        }
                        style={{
                            backgroundColor: '#2a2c38',
                            width: '115px',
                            height: '45px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    />

                </div>
            </Dialog>
        </div>
    )
}
