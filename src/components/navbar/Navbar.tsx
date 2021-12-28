import React, { useState } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import './Navbar.scss';


export default function Navbar() {
    const [value3, setValue3] = useState(null);
    const justifyTemplate = (option: any) => {
        return <i className={option.icon}></i>;
    }
    const justifyOptions = [
        { icon: 'pi pi-align-left', value: 'left' },
        { icon: 'pi pi-align-right', value: 'Right' },
        { icon: 'pi pi-align-center', value: 'Center' },
        { icon: 'pi pi-align-justify', value: 'Justify' }
    ];


    const start =
        <div className='menubar-items'>
            <SelectButton value={value3} options={justifyOptions} onChange={(e) => setValue3(e.value)} itemTemplate={justifyTemplate} />
        </div>

    return (
        <div>
            <Menubar start={start} />
        </div>
    )
}
