import { SideberLayout } from "@/components/layout/SideberLayout";
import PageHeader from "@/components/partials/page-header";
import { useAppDispatch } from "@/store";
import { fetchStudents } from "@/store/orders";
import { PersonPlus } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddStudent from "@/pages/students/addstudent";

type Props = {};

export default function RoomDetail({ }: Props) {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>(); // Ensure 'id' is correctly typed
    const navigate = useNavigate();

    // Fetch students when the component mounts or 'id' changes
    useEffect(() => {
        if (id) {
            dispatch(fetchStudents(Number(id)));
        }
    }, [id, dispatch]);

    return (
        <SideberLayout>
            <PageHeader title="Talabalar">
                <Button size="l" view='outlined-success' onClick={() => navigate(`/create-student/${id}`)}>
                    <Icon data={PersonPlus} size={18} />
                    Yangi talaba qo'shish
                </Button>
            </PageHeader>
            <AddStudent/>
        </SideberLayout>
    );
}
