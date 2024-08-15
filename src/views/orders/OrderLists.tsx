import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import './index.scss';
import { fetchOrders } from '@/store/orders';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {};

export default function OrdersList({ }: Props) {
    const { isPending, orders } = useAppSelector((state) => state.orders);
    const dispatch = useAppDispatch();
    const push = useNavigate()

    const columns = [
        {
            dataIndex: 'name',
            title: 'Qavat',
        }
    ];

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    return (
        <div className="order-lists-components">
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => { push(`/floor-detail/${record.id}`) },
                    };
                }}
                pagination={false}
                scroll={{ x: 1000 }}
                loading={isPending}
                columns={columns}
                dataSource={orders}
            />
        </div>
    );
}
