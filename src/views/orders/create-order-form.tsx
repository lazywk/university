import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PhoneInput from "@/components/elements/phoneInput";
import { useFormik } from "formik";
import * as Yup from 'yup';
import PasswordInput from "@/components/elements/passwordInput";
import { reversePhone } from "@/utils/format-phone";

import './index.scss';

type Props = {};

export default function CreateDriverForm({ }: Props) {
    const navigate = useNavigate();
    const { id: apartment } = useParams<{ id: string }>(); // Get 'id' as 'apartment' from URL
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<string>('');

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://37.60.235.86:8001/api/v1/users/employee/list/');
            const data = response.data;
            setGroups(data.results);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

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
                apartment: apartment, // Include apartment in the payload
                group: selectedGroup, // Include selectedGroup in the payload
            };

            try {
                await axios.post(`http://37.60.235.86:8001/api/v1/users/create/student/`, newStudent);
                // Redirect to the room detail page after successful submission
                navigate(`/room-detail/${apartment}`);
            } catch (error) {
                console.error('Error creating student:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    const { handleChange, handleBlur, values, errors, touched, handleSubmit } = formik;

    return (
        <div className="create-driver-form">
            <form className="row">
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
                                <option key={item.id} value={item.id}>{item.first_name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className={`btn btn-success ${loading ? 'loading' : ''}`}
                        onClick={() => {
                            handleSubmit(); // Call Formik's handleSubmit on click
                        }}
                        disabled={loading}
                    >
                        Saqlash
                    </button>
                </div>
            </form>
        </div>
    );
}
