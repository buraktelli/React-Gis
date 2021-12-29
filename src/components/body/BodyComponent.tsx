import React from 'react'
import './BodyComponent.scss';
import { Splitter, SplitterPanel } from 'primereact/splitter';


export default function BodyComponent() {
    return (
        <div style={{height:'100%'}}>
            <Splitter style={{ height: '100%' }} className="p-mb-5">
                <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
                    MAP
                </SplitterPanel>
                <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
                    PANORAMA
                </SplitterPanel>
            </Splitter>

        </div>
    )
}
