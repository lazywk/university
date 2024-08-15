import { ChangeEvent, useState } from 'react'
import { Eye, EyeSlash } from '@gravity-ui/icons'
import { TextInput, TextInputProps } from '@gravity-ui/uikit'


export default function PasswordInput(props: TextInputProps) {
    const [passVisible, setPassVisible] = useState<boolean>(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange?.(event)
    }

    return (
        <TextInput
            {...props}
            onChange={handleChange}
            type={passVisible ? 'text' : 'password'}
            rightContent={<div style={{ marginRight: '7px', cursor: 'pointer', display: 'flex' }}>
                {passVisible ?
                    <EyeSlash onClick={() => setPassVisible(false)} />
                    : <Eye onClick={() => setPassVisible(true)} />}
            </div>}
        />
    )
}