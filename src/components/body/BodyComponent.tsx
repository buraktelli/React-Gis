import React from 'react'
import './BodyComponent.scss';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useAppDispatch, useAppSelector } from '../../state/store/index'

export default function BodyComponent() {
    const visibility = useAppSelector((state) => state.table.visibility)

    return (
        <div style={{ height: '100%' }}>
            {
                !visibility ?
                    <Splitter layout='vertical' style={{ height: '100%' }} className="p-mb-5" >
                        <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
                            <Splitter style={{ height: '100%' }}>
                                <SplitterPanel>
                                    MAP
                                </SplitterPanel>
                                <SplitterPanel>
                                    PANORAMA
                                </SplitterPanel>
                            </Splitter>
                        </SplitterPanel>
                    </Splitter> :
                    <Splitter layout='vertical' style={{ height: '100%' }} className="p-mb-5" >
                        <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={80}>
                            <Splitter style={{ height: '100%' }}>
                                <SplitterPanel>
                                    MAP
                                </SplitterPanel>
                                <SplitterPanel>
                                    PANORAMA
                                </SplitterPanel>
                            </Splitter>
                        </SplitterPanel>
                        <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={20}>
                            Table
                        </SplitterPanel>
                    </Splitter>
            }
        </div >
    )
}
