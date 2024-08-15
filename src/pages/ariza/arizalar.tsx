import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
// import CreateAriza from "../ariza/create-ariza"

type Props = {}

export default function CreateDriver({ }: Props) {
    // const navigate = useNavigate()

    return (
        <SideberLayout>
            <PageHeader title="Arizani to'ldiring" />
            {/* <CreateAriza firstName={"ISM FAMILYA"} address={"ADRESS"} currentDate={"HOZIRGI SANA"} responsible={"TRUE"} status={"YAXSHI"} /> */}
        </SideberLayout>
    )
}