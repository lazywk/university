import React from "react"

type Props = {
    title: string
    children?: React.ReactNode | undefined
}

export default function PageHeader({ title, children }: Props) {
    return (
        <div className="between" style={{ marginBottom: '15px' }}>
            <h2 className="page-title">
                {title}
            </h2>
            {children}
        </div>
    )
}