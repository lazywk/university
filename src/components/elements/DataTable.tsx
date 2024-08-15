import { Card, Loader, Text } from '@gravity-ui/uikit'
import { ReactNode } from 'react'

export interface customTableDataProps {
    xs: number
    title: string
    dataIndex?: string | ReactNode
    render?: (source: any) => any | undefined
}

interface DataTableProps {
    columns: customTableDataProps[]
    data: any[],
    loading?: boolean
}


export default function DataTable({ columns, data, loading = false }: DataTableProps) {


    return (
        <div style={{ maxWidth: '100%', overflowX: 'auto', padding: '0 5px' }}>
            <Card
                style={{
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                    cursor: 'pointer',
                    borderRadius: '0',
                    border: '0',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.3)'
                }}
            >
                {columns.map((el, i) => (
                    <div  key={i} style={{ textAlign: 'start', flex: el.xs }}>
                        <Text variant='subheader-1'>{el.title}</Text>
                    </div>
                ))}
            </Card>
            {
                data.length === 0 ? (
                    <div style={{ flexGrow: 1, textAlign: 'center', padding: '50px 0' }}>
                        {loading ? <Loader size='m' /> : <Text variant='body-3' color='secondary'>Ma'lumot topilmadi :{'('}</Text>}
                    </div>
                ) : ''
            }

            {data.length ? data.map((item, index) => {
                return (
                    <Card
                        key={index}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '0px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            width: '100%',
                            border: '0',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                    >

                        {
                            columns.map((el, i) => (
                                <div key={i} style={{ textAlign: 'start', flex: el.xs }}>
                                    <div  style={{ fontSize: 13 }}>
                                        {el.dataIndex === 'index' ? index + 1 : el.render ? el.render(item[`${el.dataIndex}`]) : item[`${el.dataIndex}`]}
                                    </div>
                                </div>
                            ))
                        }
                    </Card>
                )
            }) : ''
            }
        </div>
    )
}
