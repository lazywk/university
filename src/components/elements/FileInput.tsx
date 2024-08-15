import { CircleCheck, FolderOpen } from '@gravity-ui/icons'
import { Button, Icon } from '@gravity-ui/uikit'
import { ChangeEvent, useRef } from 'react'

export default function FileInput(props: any) {

    const fileRef: any = useRef(null)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange?.({
            ...event,
            target: {
                ...event.target,
                files: fileRef?.current?.files
            }
        });
    }

    return (
        <label>
            <Button
                view={fileRef?.current?.files?.[0] ? 'outlined-success' : 'normal'}
                size="l" width="max"
                className="d-flex align-items-center"
                onClick={() => fileRef.current?.click?.()}

            >
                {fileRef?.current?.files?.[0] ? fileRef?.current?.files?.[0]?.name : "Haydovchilik guvohnomasi rasmi"}

                <Icon data={fileRef?.current?.files?.[0] ? CircleCheck : FolderOpen} size={18} />
            </Button>
            <input
                {...props}
                ref={fileRef}
                className={`d-flex align-items-center visually-hidden ${props?.className}`}
                type="file"
                onChange={handleChange}
            />
        </label>
    )
}