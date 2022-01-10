import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';
import './Language.scss'

const languages = [
    { value: 'en', label: 'EN', src: 'icons/en.png' },
    { value: 'tr', label: 'TR', src: 'icons/tr.png' },
];
export default function Language() {
    const [language, setLanguage] = useState('tr')
    const { i18n } = useTranslation();

    const changeLanguage = (e: any) => {
        i18n.changeLanguage(e.value);
        setLanguage(e.value);
        localStorage.setItem('userLanguage', e.value);
    }
    const selectedLanguageTemplate = (option: { label: string, src: string }, props: { placeholder: string }) => {
        if (option) {
            return (
                <div className='country-item-value'>
                    <img alt={option.label} src={option.src} />
                    <div>{option.label}</div>
                </div>
            );
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    const languageOptionTemplate = (option: any) => {

        return (
            <div className='country-item'>
                <img alt={option.label} src={option.src} />
                <div>{option.label}</div>
            </div>
        );
    }
    return (
        <div className='Language'>
            <Dropdown
                className='languages-selection'
                value={language}
                options={languages}
                onChange={changeLanguage}
                optionLabel='label'
                valueTemplate={selectedLanguageTemplate}
                itemTemplate={languageOptionTemplate}
            />
        </div>
    )
}
