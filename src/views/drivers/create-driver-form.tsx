import PhoneInput from "@/components/elements/phoneInput"
import { Button, Icon, Label, TextInput } from "@gravity-ui/uikit"
import { useFormik } from "formik";
import * as Yup from 'yup'
import './index.scss'
import PasswordInput from "@/components/elements/passwordInput";
import AmountInput, { revereAmount } from "@/components/elements/AmountInput";
import { reversePhone } from "@/utils/format-phone";
import { FolderOpen } from '@gravity-ui/icons';
import { CircleCheck } from '@gravity-ui/icons';
import { CircleExclamation } from '@gravity-ui/icons';
import { useRef, useState } from "react";
import { useAppDispatch } from "@/store";
import { createDriver } from "@/store/drivers";
import { useNavigate } from "react-router-dom";


type Props = {}

export default function CreateDriverForm({ }: Props) {

    const fileRef: any = useRef(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)

    const validationSchema = Yup.object({
        first_name: Yup.string().required("Ism majburiy"),
        phone: Yup.string().required("Telefon raqam majburiy"),
        password: Yup.string().required("Parol majburiy"),
        wallet: Yup.string(),
        model: Yup.string().required("Mashina modeli majburiy"),
        image: Yup.mixed().required('Haydovchilik guvohnomasi majburiy'),
        number: Yup.string().required("Mashina davlat raqami"),
        color: Yup.string().required("Mashina rangi"),
    });

    const initialValues = {
        first_name: '',
        phone: '',
        password: '',
        wallet: '0',
        image: null,
        number: '',
        color: '',
        model: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const newValues: any = { ...values, phone: reversePhone(values.phone), wallet: Number(revereAmount(values.wallet)) }
            const formdata = new FormData()

            Object.keys(newValues).map((key: any) => {
                if (key === 'image') {
                    formdata.append(key, fileRef?.current?.files?.[0])
                } else {
                    formdata.append(key, newValues[key])
                }
            })

            const resp = await dispatch(createDriver(formdata))

            if (resp.meta.requestStatus === 'rejected') {
                formik.setErrors(resp.payload)
            } else {
                navigate('/drivers')
            }
            setLoading(false)
        }
    })

    const { handleChange, handleBlur, values, errors, touched, handleSubmit } = formik

    return (
        <div className="create-driver-form">
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6 d-flex flex-column gap-3 mb-3">
                    <TextInput
                        size="l"
                        placeholder="To'liq ism"
                        autoComplete="off"
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        error={errors.first_name && touched.first_name}
                        errorMessage={errors.first_name}
                    />
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

                    <AmountInput
                        size="l"
                        placeholder="Balans"
                        name="wallet"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.wallet}
                        error={errors.wallet && touched.wallet}
                        errorMessage={errors.wallet}
                        rightContent={<Label size="s">so'm</Label>}
                    />
                </div>
                <div className="col-md-6 d-flex flex-column gap-3 mb-3">
                    <label>
                        <Button
                            view={
                                errors.image ? 'outlined-danger' : fileRef?.current?.files?.[0] ? 'outlined-success' : 'normal'
                            }
                            size="l" width="max"
                            className="d-flex align-items-center"
                            onClick={() => fileRef.current?.click?.()}

                        >
                            {
                                errors.image ? errors.image :
                                    fileRef?.current?.files?.[0] ?
                                        fileRef?.current?.files?.[0]?.name : "Haydovchilik guvohnomasi rasmi"}

                            <Icon
                                data={
                                    errors.image ? CircleExclamation : fileRef?.current?.files?.[0] ? CircleCheck : FolderOpen
                                }
                                size={18}
                            />
                        </Button>
                        {errors.image && <span style={{ color: 'rgb(233, 3, 58)' }}>{errors.image}</span>}
                        <input
                            accept=".jpeg, .png, .jpg"
                            ref={fileRef}
                            className="d-flex align-items-center visually-hidden"
                            type="file"
                            // size="l"
                            name="image"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.image || ''}
                        />
                    </label>

                    <TextInput
                        size="l"
                        placeholder="Mashina modeli"
                        autoComplete="off"
                        name="model"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.model}
                        error={errors.model && touched.model}
                        errorMessage={errors.model}
                    />

                    <TextInput
                        size="l"
                        placeholder="Mashina raqami"
                        autoComplete="off"
                        name="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.number}
                        error={errors.number && touched.number}
                        errorMessage={errors.number}
                    />

                    <TextInput
                        size="l"
                        placeholder="Mashina rangi"
                        autoComplete="off"
                        name="color"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.color}
                        error={errors.color && touched.color}
                        errorMessage={errors.color}
                    />

                    <Button loading={loading} type="submit" view='outlined-success' size="l" width='max'>Saqlash</Button>
                </div>
            </form>
        </div>
    )
}