import { useEffect, useState } from 'react';
import { formatPhone } from '@/utils/format-phone';
import { Pagination, Table } from 'antd';
import axios from 'axios';

type Props = {};

export default function StudentsList({ }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [students, setStudents] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(0);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://37.60.235.86:8001/api/v1/common/group/list/');
                setGroups(response.data.results);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            setIsPending(true);
            try {
                const response = await axios.get('http://37.60.235.86:8001/api/v1/users/student/list/', {
                    params: { page: currentPage }
                });
                setStudents(response.data.results);
                setPageCount(response.data.count);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setIsPending(false);
            }
        };

        fetchStudents();
    }, [currentPage]);

    const getGroupNameById = (id: number) => {
        const group = groups.find((group: any) => group.id === id);
        return group ? group.name : 'Unknown';
    };

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
            dataIndex: 'apartment',
            title: 'Xona',
        },
        {
            dataIndex: 'group',
            title: 'Gruppa',
            render: (group: any) => getGroupNameById(group),
        },
        {
            dataIndex: 'attendance',
            title: 'Attendance',
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
            <Table loading={isPending} pagination={false} columns={columns} dataSource={students} />
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
