import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { formatAmount } from '@/components/elements/AmountInput';
import { Pagination, Table } from 'antd';
import { fetchTraffics } from '@/store/traffics';
import { Database, PencilToSquare, TrashBin } from '@gravity-ui/icons';
import { Button, Form, Input, InputNumber, Modal, } from 'antd';
import http from '@/utils/http';
import { API_ENDPOINTS } from '@/utils/api_endpoints';
import toast from 'react-hot-toast';

type Props = {};

export default function TrafficList({ }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { isPending, traffics, pageCount } = useAppSelector((state) => state.traffics);
    const count = Math.ceil(pageCount / 15);
    const dispatch = useAppDispatch();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [open, setOpen] = useState<boolean>(false);
    const [trafficItem, setTrafficItem] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);



    const handleClickItem = async (item: any) => {
        if (item?.id) {
            setOpen(true);
            setTrafficItem(item)
        }
    }

    async function postOrder(values: any) {
        const data = {
            amount: values?.price,
            name: values?.title,
        }
        try {
            setLoading(true)
            form1.resetFields();
            await http.post(API_ENDPOINTS.TRAFFICS, data);
            toast.success("Muvaffaqiyatli Ta'rif yaratildi");
            dispatch(fetchTraffics({ page: currentPage, search: '' }))

        } catch (error: any) {
            throw toast.error(error?.message);

        } finally {
            setLoading(false)
        }

    }

    async function postOrderPatch(values: string) {
        try {
            form2.resetFields();
            await http.patch(API_ENDPOINTS.TRAFFICS + trafficItem?.id + "/", values);
            toast.success("Muvaffaqiyatli yangilandi");
            dispatch(fetchTraffics({ page: currentPage, search: '' }))

        } catch (error: any) {
            throw toast.error(error?.message);
        }
        setOpen(false)

    }

    const handleClickItemDelete = async (item: any) => {
        if (item?.id) {
            try {
                await http.delete(API_ENDPOINTS.TRAFFICS + item?.id + "/",);
                toast.success("Muvaffaqiyatli o'chirildi");
                dispatch(fetchTraffics({ page: currentPage, search: '' }))

            } catch (error: any) {
                throw toast.error(error?.message);
            }
        }

    }


    const column = [
        {
            dataIndex: 'name',
            title: "Ta'riflar",
        },
        {
            dataIndex: 'amount',
            title: "Ta'rif narxi",
            render: (amout: string) => (
                <div className='d-flex gap-1 align-items-center'>
                    <Database className='text-warning' />
                    <span>{formatAmount(amout)} so'm</span>

                </div>
            ),
        },
        {
            dataIndex: 'is_active',
            title: 'Holati',
            render: (is_active: boolean) => (
                <span>{is_active ? "Faol" : "Faol emas"}</span>
            )
        },
        {
            dataIndex: 'id',
            title: 'Harkatlar',
            render: (_: any, item: any) => (
                <div className="d-flex align-itmes-center gap-3">
                    <PencilToSquare onClick={() => handleClickItem(item)} style={{ cursor: 'pointer', color: "orange" }} />
                    <TrashBin onClick={() => handleClickItemDelete(item)} style={{ cursor: 'pointer', color: "red" }} />
                </div>
            ),
        },

    ];


    useEffect(() => {
        if (currentPage) {
            dispatch(fetchTraffics({ page: currentPage, search: '' }));
        }
    }, [currentPage]);

    useEffect(() => {
        if (trafficItem) {
            form2.setFieldsValue({
                name: trafficItem?.name,
                amount: trafficItem?.amount,
            });
        }
    }, [open, trafficItem, form2]);


    return (
        <div>
            <Form
                form={form1}
                onFinish={postOrder}
                className="row mt-3  mb-5 "
                layout='vertical'
            >


                <Form.Item
                    label="Ta'rif nomi"
                    className="col-md-5 m-0 "
                    name="title"
                    rules={[
                        {
                            required: true,
                            message:
                                "Ta'rif  nomini kirtish majburiy",
                        },
                    ]}>
                    <Input
                        style={{ height: "47px" }}
                        placeholder="Ta'rif  nomi"></Input>
                </Form.Item>


                <Form.Item
                    className="col-md-5 m-0"
                    name="price"
                    label="Narxi"
                    rules={[
                        {
                            required: true,
                            message:
                                "Ta'rif narxini kiritish majburiy",
                        },
                    ]}>

                    <InputNumber
                        placeholder="Ta'rif narxi"
                        className='w-100 py-2'
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value: any) => value?.replace(/\$\s?|(,*)/g, '')}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />

                </Form.Item>

                <Button
                    loading={loading}
                    htmlType="submit"
                    style={{
                        height: '47px',
                        padding: "1px 30px",
                        marginTop: "30px"
                    }}
                    className="btn-primary btn-send-email col-md-2">
                    <span
                        style={{
                            fontSize:
                                '16px',
                        }}>
                        Yaratish
                    </span>
                </Button>

            </Form>

            <Table columns={column} dataSource={traffics} loading={isPending} pagination={false} />
            {
                count > 1 && <Pagination
                    onChange={(e) => setCurrentPage(e)}
                    align='start'
                    defaultCurrent={currentPage}
                    total={count} className='my-3'

                />
            }

            <Modal
                title={<p>Ta'riflarni tahrirlash</p>}
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <Form
                    form={form2}
                    onFinish={postOrderPatch}
                    className="row mt-3 mb-2 "
                    layout='vertical'
                    noValidate
                >

                    <Form.Item
                        label="Ta'rif nomi"
                        className="col-md-12 mb-3 "
                        name="name">
                        <Input
                            style={{ height: "47px" }}
                            placeholder="Ta'rif  nomi"></Input>
                    </Form.Item>


                    <Form.Item
                        className="col-md-12 mb-3"
                        name="amount"
                        label="Narxi">

                        <InputNumber
                            placeholder="Ta'rif narxi"
                            className='w-100 py-2'
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value: any) => value?.replace(/\$\s?|(,*)/g, '')}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />

                    </Form.Item>

                    <div >
                        <Button
                            loading={loading}
                            htmlType="submit"
                            style={{
                                height: '47px',
                                padding: "1px 30px",
                            }}
                            className="btn-primary btn-send-email col-md-12">
                            <span
                                style={{
                                    fontSize:
                                        '16px',
                                }}>
                                Saqlash
                            </span>
                        </Button>
                    </div>

                </Form>
            </Modal>
        </div>
    );
}
