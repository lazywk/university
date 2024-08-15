// src/NotFound.jsx

import { useAppSelector } from "@/store";
import { Button, ThemeProvider } from "@gravity-ui/uikit";
import { useNavigate } from "react-router-dom";
import { ArrowUturnCcwLeft } from '@gravity-ui/icons';

const NotFound = () => {
    const { theme } = useAppSelector(state => state.theme)
    const navigate = useNavigate()

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: '100vh', width: '100%' }}>
                <div className="text-center" style={{ padding: '160px 0' }}>
                    <h1>404 - Sahifa topilmadi!</h1>
                    <p>Kechirasiz, qandaydir muammo yuzaga kelgan bo'lishi mumkin</p>
                    <Button size="l" style={{ marginTop: '50px' }} onClick={() => navigate('/')}>
                        <ArrowUturnCcwLeft style={{ marginRight: '5px' }} />
                        Qaytish
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default NotFound;
