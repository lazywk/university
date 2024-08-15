import React from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

import './style.scss';
import { useAppSelector } from '@/store';
import Sidebar from '../partials/sidebar';
import Header from '../partials/header';

export type AppProps = {
    children: React.ReactNode;
};

export const SideberLayout: React.FC<AppProps> = ({ children }) => {

    const { theme, menuType } = useAppSelector(state => state.theme)

    return (
        <ThemeProvider theme={theme}>
            <div className='container-fill'>

                <div className="main-layout-inner">
                    <Sidebar />

                    <div className={`sidebar-overlay ${menuType === 'collepse' ? 'sidebar-overlay-close' : ''}`}></div>
                    <div className="site-content">
                        <Header />
                        <div className="site-inner">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </ThemeProvider>
    );
};
