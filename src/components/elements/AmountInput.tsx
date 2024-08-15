import { ChangeEvent, useState } from 'react';
import { TextInput, TextInputProps } from '@gravity-ui/uikit';

// Helper function to format numbers
export const formatAmount = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Helper function to unformat numbers
export const revereAmount = (value: string) => {
    return value.replace(/\s+/g, '');
};

export default function AmountInput(props: TextInputProps) {
    const [value, setValue] = useState<string>(`${props?.value || ""}`);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value;

        // Remove any non-numeric characters
        const numericValue = rawValue.replace(/[^0-9]/g, '');

        setValue(numericValue);

        props.onChange?.(event);
    }

    return (
        <TextInput
            {...props}
            onChange={handleChange}
            value={formatAmount(value)}
        />
    );
}
