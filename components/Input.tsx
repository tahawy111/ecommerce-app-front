import { FC } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder: string;
}

const Input: FC<InputProps> = ({ placeholder, ...props }) => {
    const inputId = Date.now().toString() + Math.random();
    return <div className=''>
        <label htmlFor={inputId}>{placeholder}</label>
        <input id={inputId} placeholder={placeholder} {...props} />
    </div>;
};

export default Input;