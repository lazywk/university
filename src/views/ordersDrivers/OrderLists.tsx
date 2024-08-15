import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import './index.scss';
import { fetchOrdersDrivers } from '@/store/orders-drivers';
import { Pagination, Table } from 'antd';
import { formatAmount } from '@/components/elements/AmountInput';
import { Database } from '@gravity-ui/icons';


export default function OrdersDriversList() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { isPending, ordersDrivers, pageCount } = useAppSelector((state) => state.ordersDrivers);
    const count = Math.ceil(pageCount / 15);

    const dispatch = useAppDispatch();

    const columns = [
        {
            dataIndex: 'driver',
            title: 'Haydovchi',
        },
        {
            dataIndex: 'traffic',
            title: "Ta'rif",
        },
        {
            dataIndex: 'amount',
            title: 'Narx',
            render: (amout: string) => (
                <div className='d-flex gap-1 align-items-center'>
                    <Database className='text-warning' />
                    <span>{formatAmount(amout)} so'm</span>

                </div>
            ),
        },
        {
            dataIndex: 'created_at',
            title: 'Sotib olingan sana',
        },
        {
            dataIndex: 'status',
            title: 'Holat',
        },
    ];

    useEffect(() => {
        if (currentPage) {
            dispatch(fetchOrdersDrivers(currentPage));
        }
    }, [currentPage]);




    return (
        <div className="order-lists-components">
            <Table loading={isPending} columns={columns} dataSource={ordersDrivers} pagination={false} />
            {
                count > 1 && <Pagination
                    onChange={(e) => setCurrentPage(e)}
                    align='start'
                    defaultCurrent={currentPage}
                    total={count} className='my-3'

                />
            }
        </div>
    );
}
