import { SideberLayout } from "@/components/layout/SideberLayout";
import PageHeader from "@/components/partials/page-header";
import { useAppDispatch } from "@/store";
import { fetchRooms } from "@/store/orders";
import FloorDetailView from "@/views/orders/floor-detail";
import { FolderPlus } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddRoom from '../rooms/CreateRoom'; // Adjust the path as needed
import Modal from '../rooms/modal'; // Adjust the path as needed

type Props = {}

export default function FloorDetail({ }: Props) {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchRooms(Number(id)));
        }
    }, [id, dispatch]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <SideberLayout>
            <PageHeader title="Xonalar">
                <Button size="l" view='outlined-success' onClick={openModal}>
                    <Icon data={FolderPlus} size={18} />
                    Yangi xona qo'shish
                </Button>
            </PageHeader>
            <FloorDetailView />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AddRoom onClose={closeModal} floorId={Number(id)} />
            </Modal>
        </SideberLayout>
    );
}
