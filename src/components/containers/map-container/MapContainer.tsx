import React, { useEffect, useRef, useState } from 'react'
import { Map as OlMap, MapBrowserEvent, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import './MapContainer.scss';

export default function MapContainer() {
    const mapRef = useRef(document.createElement('div'));
    const [olMap, setOlMap] = useState<OlMap | null>(null)
    const t = useRef<OlMap | null>(null);
    const resize = () => {
        const map = t.current
        map!.updateSize()
    }
    const [resizeObserver, setresizeObserver] = useState(new (window as any).ResizeObserver(resize.bind(MapContainer)))
    resizeObserver.observe(mapRef.current);

    useEffect(() => {
        const v = new View({
            center: [3226637.665,5017831.872],
            zoom: 12,
            // projection: 'EPSG:4326'
            // minZoom: props.zoom - 1
        });
        const l = [
            new TileLayer({
                source: new OSM(),
            })
        ]

        const map = new OlMap({
            layers: l,
            target: mapRef.current,
            view: v,
            controls: []
        });

        t.current = map;
        setOlMap(map);
        (window as any).map = map
        map.on('click', mapClick);
        return () => {
            map.dispose()
        };
    }, []);

    const mapClick = (event: MapBrowserEvent<any>) => {

    }
    return (
        <>
            <div className='Map' ref={mapRef}></div>
        </>
    )
}
