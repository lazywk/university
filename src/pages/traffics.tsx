import {SideberLayout} from '@/components/layout/SideberLayout';
import PageHeader from '@/components/partials/page-header';
import TrafficList from '@/views/traffics/TrafficsLists';

type Props = {};

export default function Traffics({}: Props) {
    return (
        <SideberLayout>
            <div className="drivers-main">
                <PageHeader title="Ta'riflar"></PageHeader>
                <TrafficList />
            </div>
        </SideberLayout>
    );
}
