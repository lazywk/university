import { useEffect } from 'react';
import { fetchStudents } from '@/store/orders';
import './index.scss';
import { useAppDispatch, useAppSelector } from "@/store";
import http from '@/utils/http';
import { Button } from '@gravity-ui/uikit';
import { Table } from "antd";
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Props = {}
export default function RoomDetailView({ }: Props) {
    const { isPending, students } = useAppSelector(state => state.orders);
    const dispatch = useAppDispatch();
    const { id: roomId } = useParams<{id:any}>();

    useEffect(() => {
        if (roomId) {
            fetchRoomDetails();
        }
    }, [roomId]);

    const fetchRoomDetails = async () => {
        try {
            await dispatch(fetchStudents(roomId));
            await fetchAttendanceData(roomId);
        } catch (error) {
            console.error("Failed to fetch room details:", error);
        }
    }

    const fetchAttendanceData = async (roomId: string) => {
        try {
            const response = await axios.get(`http://37.60.235.86:8001/api/v1/common/attendance/date/?apartment=${roomId}&date=${getCurrentDate()}`);
            console.log("Attendance data:", response.data);
        } catch (error) {
            console.error("Failed to fetch attendance data:", error);
        }
    }

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    const handleAttendance = async (attendance: { id: number, student: number, apartment: number, is_available: boolean, is_late: boolean, student_name: string, room_name: string }) => {
        const { id, student, apartment, is_available, is_late, student_name, room_name } = attendance;
        const date = getCurrentDate();

        try {
            await http.patch(`http://37.60.235.86:8001/api/v1/common/attendance/${id}/`, {
                id,
                is_available,
                student,
                date,
                apartment,
                is_late,
                student_name,
                room_name
            });
            await dispatch(fetchStudents(roomId));
        } catch (error) {
            console.error("Failed to update attendance:", error);
        }
    }

    const columns = [
        {
            dataIndex: 'first_name',
            title: 'Ism familiya',
        },
        {
            dataIndex: 'phone',
            title: 'Telefon',
            render: (phone: string) => (phone)
        },
        {
            dataIndex: 'attendance',
            title: "Yo'qlama",
            render: (attendance: false | {
                id: number,
                student: number,
                apartment: number,
                is_available: boolean | null,
                is_late: boolean,
                student_name: string,
                room_name: string
            }) => <div>
                    <Button
                        onClick={() => attendance && handleAttendance({ ...attendance, is_available: true })}
                        view={attendance && attendance.is_available !== null ? attendance.is_available ? 'action' : 'outlined-action' : 'normal'}
                        size="l" pin="circle-clear"
                    >Bor
                    </Button>
                    <Button
                        onClick={() => attendance && handleAttendance({ ...attendance, is_available: false })}
                        view={attendance && attendance.is_available !== null ? attendance.is_available ? 'outlined-action' : 'action' : 'normal'}
                        size="l" pin="clear-circle"
                    >Yo'q
                    </Button>
                </div>
        }
    ];

    return (
        <div className="create-driver-form row">
            <div className="col-md-6">
                <Table
                    pagination={false}
                    loading={isPending}
                    columns={columns}
                    dataSource={students}
                />
            </div>
        </div>
    )
}
