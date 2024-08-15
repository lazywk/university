import block from 'bem-cn-lite';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Button} from '@gravity-ui/uikit';
import {useState} from 'react';
import {LoginProps} from '@/interfaces/app';
import PhoneInput from '@/components/elements/phoneInput';
import PasswordInput from '@/components/elements/passwordInput';
import {useAppDispatch} from '@/store';
import {loginSuccess} from '@/store/auth';
import {useNavigate} from 'react-router-dom';
import http from '@/utils/http';
import {reversePhone} from '@/utils/format-phone';
import {API_ENDPOINTS} from '@/utils/api_endpoints';

type Props = {};

const b = block('login-form');

export default function LoginForm({}: Props) {
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        phone: Yup.string().required('Telefon raqam kiriting'),
        password: Yup.string().required('Parol kiriting'),
    });

    const initialValues: LoginProps = {
        phone: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const resp = await http.post(API_ENDPOINTS.LOGIN, {
                    ...values,
                    phone: reversePhone(values?.phone),
                });
                const { tokens, role } = resp.data;
                dispatch(loginSuccess({ token: tokens.access, role }));
                navigate('/');
            } catch (err: any) {
                formik.setErrors(err?.response?.data);
            }

            setLoading(false);
        },
    });

    return (
        <form className={b()} onSubmit={formik.handleSubmit}>
            <PhoneInput
                placeholder="Telefon raqam"
                error={!!formik.errors.phone && formik.touched.phone}
                errorMessage={formik.errors.phone}
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                size="l"
                autoComplete="off"
            />

            <PasswordInput
                placeholder="Parol"
                error={!!formik.errors.password && formik.touched.password}
                errorMessage={formik.errors.password}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                size="l"
            />

            <Button loading={loading} type="submit" size="l">
                Kirish
            </Button>
        </form>
    );
}
