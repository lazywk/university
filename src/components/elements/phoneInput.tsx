import { formatPhone, formatPhoneNumber } from "@/utils/format-phone"
import { TextInput, TextInputProps } from "@gravity-ui/uikit"
import { ChangeEvent, useState } from "react"


export default function PhoneInput(props: TextInputProps) {
    const [value, setValue] = useState<string>(formatPhone(props?.value || ""))

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange?.(event)

        setValue(formatPhoneNumber(event.target.value))
    }

    return (
        <TextInput
            {...props}
            type="text"
            onChange={handleChange}
            value={value}
            placeholder=" XX XXX XX XX"
            autoComplete="off"
            leftContent={
                <span style={{ paddingLeft: '7px', paddingRight: '2px' }}>+998</span>
            }
        />
    )
}