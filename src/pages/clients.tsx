import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import ClientsList from "@/views/clients/clients-list"
// import { PersonPlus } from "@gravity-ui/icons"
// import { Button, Icon } from "@gravity-ui/uikit"
// import { useNavigate } from "react-router-dom"

type Props = {}

export default function Clients({ }: Props) {
    // const navigate = useNavigate()

    return (
        <SideberLayout>
            <div className="drivers-main">
                <PageHeader title="Mijozlar">
                    {/* <Button size="l" view='outlined-success' onClick={() => navigate('/create-client')}>
                        <Icon data={PersonPlus} size={18} />
                        Yangi yaratish
                    </Button> */}
                </PageHeader>
                <ClientsList />
            </div>

        </SideberLayout>
    )
}