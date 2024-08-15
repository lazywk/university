import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import CreateDriverForm from "@/views/drivers/create-driver-form"

type Props = {}

export default function CreateDriver({ }: Props) {
    // const navigate = useNavigate()

    return (
        <SideberLayout>
            <PageHeader title="Haydovchi uchun anketa" />
            <CreateDriverForm />
        </SideberLayout>
    )
}