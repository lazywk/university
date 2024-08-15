import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import DriversList from "@/views/drivers/drivers-list"
import { PersonPlus } from "@gravity-ui/icons"
import { Button, Icon } from "@gravity-ui/uikit"
import { useNavigate } from "react-router-dom"

type Props = {}

export default function Drivers({ }: Props) {
    const navigate = useNavigate()

    return (
        <SideberLayout>
            <div className="drivers-main">
                <PageHeader title="Haydovchilar">
                    <Button size="l" view='outlined-success' onClick={() => navigate('/create-driver')}>
                        <Icon data={PersonPlus} size={18} />
                        Yangi yaratish
                    </Button>
                </PageHeader>
                <DriversList />
            </div>

        </SideberLayout>
    )
}