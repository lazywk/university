import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import AddStudentForm from "./addstudent";

type Props = {}

export default function CreateStudent({ }: Props) {
    // const navigate = useNavigate()

    return (
        <SideberLayout>
            <PageHeader title="Talaba yaratish uchun" />
            <AddStudentForm/>
        </SideberLayout>
    )
}