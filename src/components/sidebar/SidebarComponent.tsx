import React, { useEffect, useRef, useState } from 'react';
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
import { ContextMenu } from 'primereact/contextmenu';
import { t } from 'i18next';
import { tableVisibleChange } from '../../state/features/tableSlice'

export default function SidebarComponent() {
    const visibility = useAppSelector((state) => state.sidebar.visibility)
    const dispatch = useAppDispatch()
    const [selectedKeys, setSelectedKeys] = useState<any>(null);
    const services = useAppSelector(state => state.services)
    const tableVisibility = useAppSelector((state) => state.table.visibility)

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

    const [expandedKeys, setExpandedKeys] = useState({});
    const [selectedNodeKey, setSelectedNodeKey] = useState(undefined);

    const cm = useRef(null);
    const menu = [
        {
            label: t('SIDEBAR.Open Table'),
            icon: 'pi pi-table',
            command: () => {
                // @ts-ignore
                console.log(cm.current!.layer);
                dispatch(tableVisibleChange(true))
            }
        }
    ];
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
            <ContextMenu model={menu} ref={cm} onHide={() => setSelectedNodeKey(undefined)} />

            {services.data &&
                <div className='card'>
                    <Tree
                        value={data}
                        selectionMode="checkbox"
                        selectionKeys={selectedKeys}
                        onSelectionChange={e => setSelectedKeys(e.value)}
                        expandedKeys={expandedKeys}
                        onToggle={e => setExpandedKeys(e.value)}
                        contextMenuSelectionKey={selectedNodeKey}
                        onContextMenuSelectionChange={(event: any) => setSelectedNodeKey(event.value)}
                        onContextMenu={event => {
                            const keys = Object.keys(event.node)
                            if (!keys.includes('layers')) {
                                // @ts-ignore
                                cm.current!.layer = event.node.name
                                // @ts-ignore
                                cm.current.show(event.originalEvent)
                            }
                        }}
                    />
                </div>
            }
        </div>
    )
}
