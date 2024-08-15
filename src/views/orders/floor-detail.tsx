import './index.scss';
import { useAppSelector } from "@/store";
import { Table } from "antd";
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function FloorDetailView({ }: Props) {
    const { rooms, isPending } = useAppSelector(state => state.orders)
    const navigate = useNavigate();

    const columns = [
        {
            dataIndex: 'name',
            title: 'Xona',
        }
    ];

    return (
        <div className="floor-detail-view">
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => { navigate(`/room-detail/${record.id}`) },
                    };
                }}
                pagination={false}
                scroll={{ x: 1000 }}
                loading={isPending}
                columns={columns}
                dataSource={rooms}
            />
        </div>
    )
}
