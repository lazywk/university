import {SideberLayout} from '@/components/layout/SideberLayout';
import PageHeader from '@/components/partials/page-header';
import Students from "@/views/students/students"


type Props = {};

export default function Traffics({}: Props) {
    return (
        <SideberLayout>
            <div className="drivers-main">
                <PageHeader title="Studentlar"></PageHeader>
            </div>
            <Students/>
        </SideberLayout>
    );
}
