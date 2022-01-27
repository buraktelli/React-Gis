import React, { useEffect } from 'react'
import './PanoContainer.scss';
import { PanoGL, SoftTextPlugin, ScalablePlugin, PanoromicController, AnkaPanAPI } from './easy-pano-import';
import { IAnkapanOptions } from '../../../util/pano'

export default function PanoContainer() {

    const ankapanapiOptions: IAnkapanOptions = {
        content: 'panoDiv',
        aroundService: 'https://dev-gis.ankageo.com/pano/around/',
        imageService: 'https://dev-gis.ankageo.com/pano/img/',
        tileService: 'https://dev-gis.ankageo.com/pano/tile/',
        pointCloudURL: 'https://dev-gis.ankageo.com/pano/'
    };

    useEffect(() => {
        const panogl = new PanoGL(ankapanapiOptions);

        (window as any).pano = panogl;
        panogl.gotoLocation(41.037201, 28.985391)

        panogl.start();

        panogl.addEvent(PanoGL.DATA_COMPLETE, null, panoCompleted);

        return () => {

        }
    }, [])
    function panoCompleted() {

    }

    return (
        <div id='panoDiv' tabIndex={0} className='pano'></div>
    )
}
