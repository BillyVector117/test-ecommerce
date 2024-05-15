import React from 'react'

interface IButton {
    label: string;
    color: string;
    backgroundColor?: string;
    labelColor?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (event: any) => void
}
const Button = ({ label, color = 'blue', type = 'button', onClick }: IButton) => {
    return (
        <button type={type} onClick={(event) => { onClick && onClick(event) }} className={`primary_button font-bold py-2 px-4 border-b-4 border-${color}-700 rounded w-full`} style={{ zIndex: '10', position: 'relative', }}>
            {label}
        </button>
    )
}

export default Button