
import LogoutBtn from '@/components/elements/LogoutBtn';
import './style.scss'
import ThemeToggler from "@/components/elements/themeToggler";
// import { Button, Icon } from '@gravity-ui/uikit';
// import { BroadcastSignal } from '@gravity-ui/icons';
// import { useNavigate } from 'react-router-dom';
// import { Arrows3RotateRight } from '@gravity-ui/icons';
import CreateDriverOrder from '../../../views/ordersDrivers/CreateDriverOrder';
import { useState } from 'react';

type Props = {}

export default function Header({ }: Props) {
    // const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="header gap-3">
            {/* <Button
                view='outlined-success'
                size='l'
                onClick={() => navigate('/create-order')}
            >
                <Icon data={BroadcastSignal} size={18} />
                Yangi buyurtma
            </Button>
            <Button
                view='outlined-action'
                size='l'
                onClick={() => setOpen(true)}
            >
                <Icon data={Arrows3RotateRight} size={18} />
                Balanga to'lov
            </Button> */}
            <div className="header-actions">
                <ThemeToggler />
                <LogoutBtn />
            </div>
            <CreateDriverOrder setOpen={setOpen} open={open} />
        </div>
    )
}