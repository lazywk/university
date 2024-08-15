import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import Davomatlar from "@/pages/davomatlar/page"
// import { FolderPlus } from "@gravity-ui/icons"
// import { Button, Icon } from "@gravity-ui/uikit"
// import { useNavigate } from "react-router-dom"

type Props = {}

export default function Settings({ }: Props) {
    // const navigate = useNavigate()

    return (
        <SideberLayout>
            <PageHeader title="Barcha davomadlar">
                {/* <Button size="l" view='outlined-success' onClick={() => navigate('/create-driver')}>
                    <Icon data={FolderPlus} size={18} />
                    Yangi yaratish
                </Button> */}
            </PageHeader>
            <Davomatlar/>
        </SideberLayout>
    )
}