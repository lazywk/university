import React from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import block from 'bem-cn-lite'
import { useAppSelector } from '@/store';
import ThemeToggler from '../elements/themeToggler';

import './style.scss';




export type AppProps = {
    children: React.ReactNode;
};

const b = block('auth-layout')

export const AuthLayout: React.FC<AppProps> = ({ children }) => {

    const { theme } = useAppSelector(state => state.theme)

    return (
        <ThemeProvider theme={theme}>
            <div className={b()}>
                <div className='container'>
                    <div className={b('header')}>
                        <ThemeToggler />
                    </div>
                    <div>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};
