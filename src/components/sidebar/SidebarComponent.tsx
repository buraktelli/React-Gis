import React, { useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Sidebar } from 'primereact/sidebar';
import { visibleChange } from '../../state/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';

export default function SidebarComponent() {
    const visibility = useAppSelector((state) => state.sidebar.visibility)
    const dispatch = useAppDispatch()

    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        }
                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
    ];

    return (
        <div>
            <div className="card">
                <PanelMenu
                    model={items}
                    style={{ width: '22rem' }}
                >
                </PanelMenu>
            </div>
        </div>
    )
}
