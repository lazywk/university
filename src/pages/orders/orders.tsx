import { useState } from 'react';
import { SideberLayout } from '@/components/layout/SideberLayout';
import PageHeader from '@/components/partials/page-header';
import OrdersList from '@/views/orders/OrderLists';
import { FolderPlus, PersonPlus } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import AddFloor from '../floors/addFloor'; // Adjust the path as needed
import Modal from '../floors/modal'; // Adjust the path as needed

type Props = {};

export default function Orders({ }: Props) {
    const navigate = useNavigate(); // Adjust the path as needed
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    // Handler for closing the modal and showing success message
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <SideberLayout>
            <PageHeader title="Qavatlar">
                <div className='flex gap-[20px]'>
                    <Button size="l" view='outlined-success' onClick={openModal}>
                        <Icon data={FolderPlus} size={18} />
                        Yangi qavat qo'shish
                    </Button>
                    <Button size="l" view='outlined-success' onClick={() => navigate(`/add-student`)}>
                        <Icon data={PersonPlus} size={18} />
                        Yangi talaba qo'shish
                    </Button>
                </div>
            </PageHeader>
            <OrdersList />
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <AddFloor onClose={handleModalClose} />
            </Modal>
        </SideberLayout>
    );
}
