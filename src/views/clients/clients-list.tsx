import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Table as AntTable,
    Pagination,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchClients } from '@/store/clients';
import 'antd/dist/reset.css';

const { Option } = Select;

interface Group {
    id: number;
    teacher: number;
    name: string;
    edu_form: string;
}

interface Employee {
    id: number;
    first_name: string;
    phone: string;
}

type Props = {};

export default function ClientsList({ }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { pageCount } = useAppSelector((state) => state.clients);
    const dispatch = useAppDispatch();
    const count = Math.ceil(pageCount / 15);

    const { t } = useTranslation();
    const [groups, setGroups] = useState<Group[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    console.log(employees);

    const [name, setName] = useState<string>('');
    const [teacher, setTeacher] = useState<number>(0);
    const [eduForm, setEduForm] = useState<string>('daytime');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (currentPage) {
            dispatch(fetchClients());
        }
    }, [currentPage]);

    useEffect(() => {
        fetchGroups();
        fetchEmployees();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://37.60.235.86:8001/api/v1/common/group/create/');
            setGroups(response.data.results);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://37.60.235.86:8001/api/v1/users/employee/list/');
            setEmployees(response.data.results);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const createGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://37.60.235.86:8001/api/v1/common/group/create/', {
                name,
                teacher,
                edu_form: eduForm,
            });
            setGroups([...groups, response.data]);
            setName('');
            setTeacher(0);
            setEduForm('daytime');
            handleCloseModal();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const showModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);

    if (loading) {
        return <div>{t('Loading...')}</div>;
    }

    if (error) {
        return <div>{t('Error')}: {error}</div>;
    }


    return (
        <div>
            <div className='flex justify-end mb-4'>
                <Button type="primary" onClick={showModal}>
                    {t('Create Group')}
                </Button>
            </div>

            <Modal
                title={t('Create Group')}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form onSubmitCapture={createGroup}>
                    <Form.Item
                        label={t("Group Name")}
                        required
                    >
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t("Teacher")}
                        required
                    >
                        <Select
                            value={teacher}
                            onChange={(value) => setTeacher(value)}
                        >
                            <Option value={0} disabled>
                                {t('Select a Teacher')}
                            </Option>
                            {employees.map((employee) => (
                                <Option key={employee.id} value={employee.id}>
                                    {employee.first_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={t("Education Form")}
                        required
                    >
                        <Select
                            value={eduForm}
                            onChange={(value) => setEduForm(value)}
                        >
                            <Option value="daytime">{t('Daytime')}</Option>
                            <Option value="evening">{t('Evening')}</Option>
                            <Option value="remote">{t('Remote')}</Option>
                            <Option value="correspondence">{t('Correspondence')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {t('Create Group')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {count > 1 && (
                <Pagination
                    onChange={(e) => setCurrentPage(e)}
                    align='start'
                    defaultCurrent={currentPage}
                    total={count} className='my-3'
                />
            )}

            <h2 className="my-4">{t('Groups')}</h2>
            <AntTable
                dataSource={groups.map(group => ({
                    key: group.id,
                    name: group.name,
                    teacher: employees.find(employee => employee.id === group.teacher)?.first_name || '',
                    edu_form: group.edu_form,
                }))}
                columns={[
                    {
                        title: t('Group Name'),
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: t('Teacher'),
                        dataIndex: 'teacher',
                        key: 'teacher',
                    },
                    {
                        title: t('Education Form'),
                        dataIndex: 'edu_form',
                        key: 'edu_form',
                        render: (edu_form: string) => (
                            edu_form === 'daytime' ? t('Daytime') :
                                edu_form === 'evening' ? t('Evening') :
                                    edu_form === 'remote' ? t('Remote') :
                                        edu_form === 'correspondence' ? t('Correspondence') : ''
                        ),
                    },
                ]}
                pagination={false}
            />
        </div>
    );
}
