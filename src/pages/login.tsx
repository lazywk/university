
import LoginMain from '@/views/login/login-main';
import { AuthLayout } from '../components/layout/AuthLayout';
import React from 'react';

const Login: React.FC = () => {

    return (
        <AuthLayout>
            <LoginMain />
        </AuthLayout>
    );
};


export default Login
