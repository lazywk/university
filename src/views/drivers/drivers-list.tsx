import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchDrivers } from '@/store/drivers';
import './index.scss';
import { formatPhone } from '@/utils/format-phone';
import { formatAmount } from '@/components/elements/AmountInput';
import { CarItemType } from '@/interfaces/app';
import { Database, Eye, PencilToSquare, TrashBin } from '@gravity-ui/icons';
import { Pagination, Table } from 'antd';
import FormatDateTime from '@/components/dateFormatter';
import { useNavigate } from 'react-router-dom';

type Props = {};

export default function DriversList({ }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { drivers, isPending, pageCount } = useAppSelector((state) => state.drivers);
    const dispatch = useAppDispatch();
    const count = Math.ceil(pageCount / 15);

    const push = useNavigate()

    useEffect(() => {
        if (currentPage) {
            dispatch(fetchDrivers(currentPage));
        }
    }, [currentPage]);

    const columns = [
        {
            dataIndex: 'first_name',
            title: 'Ism Familiya',
        },
        {
            dataIndex: 'phone',
            title: 'Telefon',
            render: (phone: string) => formatPhone(phone),
        },
        {
            dataIndex: 'wallet',
            title: 'Balans',
            render: (amout: string) => (
                <div className='d-flex gap-1 align-items-center'>
                    <Database className='text-warning' />
                    <span>{formatAmount(amout)} so'm</span>

                </div>
            ),
        },
        {
            dataIndex: 'car',
            title: 'Moshina',
            render: (car: CarItemType) => `${car.color}  ${car.model}`,
        },
        {
            dataIndex: 'car',
            title: 'Moshina raqami',
            render: (car: CarItemType) => `${car.number}`,
        },
        {
            dataIndex: 'created_at',
            title: "Ro'yxatdan o'tgan sana",
            render: (created_at: string) => (
                <span>{
                    <FormatDateTime targetDate={created_at} />
                }</span>
            )
        },
        {
            dataIndex: 'id',
            title: 'Harkatlar',
            render: (id: number) => (
                <div className="d-flex align-itmes-center gap-3">
                    <Eye onClick={() => push(`/detail-driver/${id}`)} style={{ cursor: 'pointer', color: "green" }} />
                    <PencilToSquare onClick={() => push(`/edit-driver/${id}`)} style={{ cursor: 'pointer', color: "orange" }} />
                    <TrashBin style={{ cursor: 'pointer', color: "red" }} />
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table scroll={{ x: 1100 }} columns={columns} pagination={false} dataSource={drivers} loading={isPending} />
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
