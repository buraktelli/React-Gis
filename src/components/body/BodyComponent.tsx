import React, { useEffect, useState } from 'react'
import './BodyComponent.scss';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import MapContainer from '../containers/map-container/MapContainer'
import PanoContainer from '../containers/pano-container/PanoContainer'
import { Mode } from '../../state/features/fullScreenSlice'

export default function BodyComponent() {
    const visibility = useAppSelector((state) => state.table.visibility)
    const sidebarVisibility = useAppSelector((state) => state.sidebar.visibility)
    const mode = useAppSelector((state) => state.fullScreenMode.mode)
    const { width, height } = useAppSelector((state) => state.dimensions)
    const [panoWidth, setPanoWidth] = useState('50%')
    const [panoHeight, setPanoHeight] = useState('100%')

    const splitterResize = (event: any) => {

    }
    useEffect(() => {
        
        setPanoWidth('20%')
        setPanoHeight('30%')

        return () => {

        }
    }, [])

    const style = {
        width: panoWidth,
    }
    const style2 = {
        height: panoHeight,
    }
    return (
        <div style={{ height: '100%' }}>
            {
                mode === Mode.BOTH ?
                    !visibility ?
                        <Splitter style={{ height: '100%' }} className="p-mb-5" onResizeEnd={splitterResize}>
                            <SplitterPanel>
                                <MapContainer></MapContainer>
                            </SplitterPanel>
                            <SplitterPanel style={style}>
                                <PanoContainer></PanoContainer>
                            </SplitterPanel>
                        </Splitter> :

                        <Splitter layout='vertical' style={{ height: '100%' }} className="p-mb-5" onResizeEnd={splitterResize}>
                            <SplitterPanel className="p-d-flex p-ai-center p-jc-center" style={style2} size={70}>
                                <Splitter style={{ height: '100%' }}>
                                    <SplitterPanel>
                                        <MapContainer></MapContainer>
                                    </SplitterPanel>
                                    <SplitterPanel style={style}>
                                        <PanoContainer></PanoContainer>
                                    </SplitterPanel>
                                </Splitter>
                            </SplitterPanel>
                            <SplitterPanel className="p-d-flex p-ai-center p-jc-center" size={30}>
                                Table
                            </SplitterPanel>
                        </Splitter>
                    :
                    mode === Mode.MAP ?
                        <MapContainer></MapContainer> :
                        <PanoContainer></PanoContainer>
            }
        </div >
    )

}
