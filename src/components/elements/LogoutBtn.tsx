import React, { useState } from "react";
import { Button, Icon, Modal } from "@gravity-ui/uikit";
import { useAppDispatch } from "@/store";
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import { logoutSuccess } from "@/store/auth";

interface Props {}

const LogoutBtn: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleLogout = () => {
        dispatch(logoutSuccess());
        toggleModal();
    };

    return (
        <div>
            <Button
                size="l"
                view="outlined"
                onClick={toggleModal}
            >
                <Icon data={ArrowRightFromSquare} />
            </Button>

            <Modal open={isModalOpen} onClose={toggleModal}>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Chiqishni tasdiqlash</h2>
                    <p>Haqiqatan ham tizimdan chiqmoqchimisiz?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                        <Button onClick={toggleModal}>
                            Bekor qilish
                        </Button>
                        <Button onClick={handleLogout}>
                            Chiqish
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LogoutBtn;
