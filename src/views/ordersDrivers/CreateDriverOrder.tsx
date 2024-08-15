import { Text, Modal, Button, Alert } from "@gravity-ui/uikit"
import { useState } from "react";
import './index.scss'
import PhoneInput from "@/components/elements/phoneInput";
import AmountInput, { revereAmount } from "@/components/elements/AmountInput";
import http from "@/utils/http";
import { DriverItemType } from "@/interfaces/app";
import { reversePhone } from "@/utils/format-phone";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useAppDispatch } from "@/store";
import { fetchDrivers } from "@/store/drivers";



type Props = {
    open: boolean,
    setOpen: any
}

export default function CreateDriverOrder({ open, setOpen }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<DriverItemType | null>(null)
    const [error, setError] = useState<any>(null)
    const [step, setStep] = useState<'search' | 'apply' | 'success'>('search')

    const [phone, setPhone] = useState<string>('')

    const dispatch = useAppDispatch()


    const handleSearch = async () => {
        setLoading(true)
        try {
            const resp = await http.get(`operator/drivers/?search=${reversePhone(phone)}`)
            if (resp.data?.results?.length) {
                setData(resp.data.results?.[0])
                setStep('apply')
            } else {
                setError({ msg: "Haydovchi topilmadi" })
            }
        } catch {
            setError({ msg: "Haydovchi topilmadi" })
        }
        setLoading(false)
    }

    const validationSchema = Yup.object({
        amount: Yup.string().required('Summani aniq kiriting')
    });

    const initialValues = {
        amount: ""
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await http.post('/operator/fill-wallet/', {
                    driver: data?.id,
                    amount: revereAmount(values.amount)
                });
                await dispatch(fetchDrivers())
                toast.success("Balans to'ldirildi")
                setOpen(false)
                setStep('search')
                setData(null)
                formik.resetForm()
            } catch (err: any) {
                if (err?.response?.data?.driver) {
                    toast.error(err?.response?.data?.driver)
                }
                formik.setErrors(err?.response?.data);
            }

            setLoading(false);
        },
    });

    return (
        <Modal open={open} onClose={() => (formik.resetForm(), setOpen(false))}>
            <div className="create-driver-order">
                <Text variant='body-3'>Haydovchi balansini to'ldirish</Text>
                <form className="create-driver-order-form" onSubmit={formik.handleSubmit}>
                    <PhoneInput
                        size="l"
                        name="phone"
                        onChange={e => {
                            setPhone(e.target.value)
                            setData(null)
                            setError(null)
                            setStep('search')
                        }}
                    />

                    {data && <Alert theme="info" title={data.first_name} message={`${data.car.color} ${data.car.model} | ${data.car.number}`} />}
                    {error && <Alert theme="danger" title={error?.msg} />}

                    {data && (
                        <>
                            <AmountInput
                                errorMessage={formik.errors.amount}
                                error={!!formik.errors.amount && formik.touched.amount}
                                size="l"
                                name="amount"
                                placeholder="Summa"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.amount}
                            />
                        </>
                    )}

                    {step === 'search' && <Button loading={loading} type="button" view="action" width="max" size="l" onClick={handleSearch}>Keyingi</Button>}
                    {step === 'apply' && <Button loading={loading} type="submit" view="outlined-success" width="max" size="l">Tasdiqlash</Button>}
                </form>
            </div>
        </Modal>
    )
}