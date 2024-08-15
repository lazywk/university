import { useEffect, useState } from 'react';
import { formatPhone } from '@/utils/format-phone';
import { Pagination, Table } from 'antd';
import axios from 'axios';

type Props = {};

export default function EmployeesList({ }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [employees, setEmployees] = useState<any[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(0);

    useEffect(() => {
        const fetchEmployees = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`http://37.60.235.86:8001/api/v1/users/employee/list/`, {
                    params: { page: currentPage }
                });
                setEmployees(response.data.results);
                setPageCount(response.data.count);
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setIsPending(false);
            }
        };

        fetchEmployees();
    }, [currentPage]);

    const columns = [
        {
            dataIndex: 'id',
            title: 'Id',
            render: (id: number) => (
                <span>#{id}</span>
            )
        },
        {
            dataIndex: 'first_name',
            title: 'Ism',
        },
        {
            dataIndex: 'phone',
            title: 'Telefon raqam',
            render: (phone: string) => formatPhone(phone),
        }
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Table loading={isPending} pagination={false} columns={columns} dataSource={employees} />
            {
                pageCount > 1 && <Pagination
                    onChange={handlePageChange}
                    align='start'
                    defaultCurrent={currentPage}
                    total={pageCount}
                    pageSize={10}
                    className='my-3'
                />
            }
        </div>
    );
}