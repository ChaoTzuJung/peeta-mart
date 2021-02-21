import React, { useState } from 'react';

interface IInputs {
    image?: string,
    name?: string,
    price?: number,
    description?: string,
}

const useForm = (initial = {}) => {
    // create a state object for out inputs
    const [inputs, setInputs] = useState<IInputs>(initial);

    // React.ChangeEvent<HTMLInputElement>
    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name, type } = e.target as HTMLInputElement
        let newValue: string | number | File | null = value;

        if(type === 'number') {
            newValue = parseInt(value);
        }

        if(type === 'file') {
            // [value] = e.target.files;
            // const newValue = (<HTMLInputElement>e.target).files[0];
            // const newValue: any = e.target as HTMLInputElement).files[0];
            const target = e.target as HTMLInputElement;
            newValue = target.files && target.files[0];
        }

        setInputs({
            // copy the exsiting state
            ...inputs,
            [name]: newValue,
        })
    };

    const resetForm = () => {
        setInputs(initial);
    };

    const clearForm = () => {
        const blankState = (<any>Object).fromEntries(
            (<any>Object).entries(inputs).map(([key, ]: [string, ]) => [key, ''])
        );
        setInputs(blankState);
    };

    // return the things we want to surface from this custom hooks
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    } as const;
};

export default useForm