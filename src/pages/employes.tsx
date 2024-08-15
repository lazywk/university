import {SideberLayout} from '@/components/layout/SideberLayout';
import PageHeader from '@/components/partials/page-header';
import Employes from "@/views/employes/EmployeesList"

type Props = {};

export default function Traffics({}: Props) {
    return (
        <SideberLayout>
            <div className="drivers-main">
                <PageHeader title="Xodimlar"></PageHeader>
                <Employes/>
            </div>
        </SideberLayout>
    );
}
