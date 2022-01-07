import React, { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Sidebar } from 'primereact/sidebar';
import { visibleChange } from '../../state/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { Tree } from 'primereact/tree';
import './SidebarComponent.scss'
import { getServices } from '../../state/features/servicesSlice';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function SidebarComponent() {
    const visibility = useAppSelector((state) => state.sidebar.visibility)
    const dispatch = useAppDispatch()
    const [selectedKeys, setSelectedKeys] = useState<any>(null);
    const services = useAppSelector(state => state.services)
    let data
    if (services.data) {
        data = [...services.data.services.services]
        data = data.map((item, index) => {
            return {
                ...item,
                children: item.layers.map((layer: any, index2: any) => {
                    return {
                        ...layer,
                        label: layer.name,
                        key: `${index}-${index2}`,
                        icon: 'youricon'
                    }
                }),
                label: item.name,
                key: `${index}`
            }
        })
    }
    useEffect(() => {
        dispatch(getServices())
        return () => {

        }
    }, [])

    return (
        <div className={`${visibility ? 'sidebar-opened' : 'sidebar-closed'}`}>
            <PanelMenu
                // model={items}
                style={{ width: '22rem' }}
            >
            </PanelMenu>
            {services.loading &&
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
            {services.error && services.error}
            {services.data &&
                <div className='card'>
                    <Tree
                        value={data}
                        selectionMode="checkbox"
                        selectionKeys={selectedKeys}
                        onSelectionChange={e => setSelectedKeys(e.value)}
                    />
                </div>
            }
        </div>
    )
}
