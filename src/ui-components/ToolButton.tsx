import React from 'react'
import { Button, ButtonPositionType } from 'primereact/button';


interface IProps {
    label?: string,
    icon?: string;
    iconPos?: ButtonPositionType,
    svg?: string,
    onClick?: () => void,
    active?: boolean
    className?: string,
    tooltip?: string,
    children?: []
}
export default function ToolButton(props: IProps) {
    const handleClick = () => {
        if (typeof props.onClick === 'function') {
            props.onClick();
        }
    }

    return (
        <Button
            label={props.label}
            icon={props.icon}
            iconPos={props.iconPos}
            tooltip={props.tooltip}
            tooltipOptions={{ position: "top", showDelay: 1000, hideDelay: 300 }}
            className={`button-primary ${props.active ? 'button-primary-active' : ''} }`}
            onClick={handleClick}
            style={{
                marginRight: '5px',
                backgroundColor: '#2a2c38',
                width: '20px',
                height: '20px',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            {props.svg && <img src={props.svg} />}
        </Button>
    )
}
