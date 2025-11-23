import React from 'react';
import Input from '../atoms/Input';

const FormField = ({ label, type, placeholder, value, onChange, name, required, error }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
                className={error ? 'border-red-500 focus:ring-red-500' : ''}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default FormField;
