import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "@/components/elements/phoneInput";
import { useFormik } from "formik";
import * as Yup from 'yup';
import PasswordInput from "@/components/elements/passwordInput";
import { reversePhone } from "@/utils/format-phone";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast

type Props = {};

export default function AddStudentForm({}: Props) {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<any[]>([]);
    const [floors, setFloors] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [selectedFloor, setSelectedFloor] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<string>('');

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://37.60.235.86:8001/api/v1/common/group/list/');
            const data = response.data.results;
            setGroups(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
            toast.error('Guruhlarni olishda xato yuz berdi.');
        }
    };

    const fetchFloors = async () => {
        try {
            const response = await axios.get('http://37.60.235.86:8001/api/v1/common/floor-list/');
            const data = response.data;
            setFloors(data);
        } catch (error) {
            console.error('Error fetching floors:', error);
            toast.error('Qavatlarni olishda xato yuz berdi.');
        }
    };

    const fetchRooms = async (floorId: string) => {
        try {
            const response = await axios.get(`http://37.60.235.86:8001/api/v1/common/room-list/${floorId}`);
            const data = response.data;
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            toast.error('Xonalarni olishda xato yuz berdi.');
        }
    };

    useEffect(() => {
        fetchGroups();
        fetchFloors();
    }, []);

    useEffect(() => {
        if (selectedFloor) {
            fetchRooms(selectedFloor);
        }
    }, [selectedFloor]);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            phone: '',
            password: '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required("Ism majburiy"),
            phone: Yup.string().required("Telefon raqam majburiy"),
            password: Yup.string().required("Parol majburiy"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const newStudent = {
                first_name: values.first_name,
                phone: reversePhone(values.phone),
                password: values.password,
                apartment: selectedRoom, 
                group: selectedGroup,
                room: selectedRoom,
            };

            try {
                await axios.post(`http://37.60.235.86:8001/api/v1/users/create/student/`, newStudent);
                toast.success("Talaba muvaffiqiyatli qo'shildi!");
                setTimeout(() => {
                    navigate('/orders');
                },2000)
            } catch (error) {
                console.error('Error creating student:', error);
                toast.error('Talabani yaratishda xato yuz berdi,chunki bu xonada 6kishi bor');
            } finally {
                setLoading(false);
            }
        }
    });

    const { handleChange, handleBlur, values, errors, touched, handleSubmit } = formik;

    return (
        <div className="create-driver-form">
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6 d-flex flex-column gap-3 mb-3">
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control ${errors.first_name && touched.first_name ? 'is-invalid' : ''}`}
                            placeholder="To'liq ism"
                            name="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                        />
                        {errors.first_name && touched.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                    </div>

                    <div className="form-group">
                        <PhoneInput
                            size="l"
                            placeholder="Telefon raqam"
                            autoComplete="off"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            error={errors.phone && touched.phone}
                            errorMessage={errors.phone}
                        />
                    </div>

                    <div className="form-group">
                        <PasswordInput
                            size="l"
                            placeholder="Parol"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={errors.password && touched.password}
                            errorMessage={errors.password}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="group-select">Guruhni tanlang</label>
                        <select
                            id="group-select"
                            className="form-control"
                            value={selectedGroup}
                            onChange={e => setSelectedGroup(e.target.value)}
                        >
                            <option value="">Guruhni tanlang</option>
                            {groups.map((item: any) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="floor-select">Qavatni tanlang</label>
                        <select
                            id="floor-select"
                            className="form-control"
                            value={selectedFloor}
                            onChange={e => setSelectedFloor(e.target.value)}
                        >
                            <option value="">Qavatni tanlang</option>
                            {floors.map((floor: any) => (
                                <option key={floor.id} value={floor.id}>{floor.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="room-select">Xonani tanlang</label>
                        <select
                            id="room-select"
                            className="form-control"
                            value={selectedRoom}
                            onChange={e => setSelectedRoom(e.target.value)}
                        >
                            <option value="">Xonani tanlang</option>
                            {rooms.map((room: any) => (
                                <option key={room.id} value={room.id}>{room.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-success ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        Saqlash
                    </button>
                </div>
            </form>
            <ToastContainer /> {/* Add ToastContainer to render the toasts */}
        </div>
    );
}
