import React, { useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Sidebar } from 'primereact/sidebar';
import { visibleChange } from '../../state/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import { Button } from 'primereact/button';

export default function SidebarComponent() {
    const visibility = useAppSelector((state) => state.sidebar.visibility)
    const dispatch = useAppDispatch()

    const customIcons = (
        <React.Fragment>
            <Button
                icon="pi pi-arrow-left"
                onClick={() => dispatch(visibleChange(!visibility))}
            />
        </React.Fragment>
    );


    return (
        <div>
            <Sidebar
                className='sidebar'
                visible={visibility}
                onHide={() => dispatch(visibleChange(!visibility))}
                dismissable={false}
                modal={false}
                icons={customIcons}
                showCloseIcon={false}
            >
                <h3>Layers</h3>
            </Sidebar>
        </div>
    )
}
