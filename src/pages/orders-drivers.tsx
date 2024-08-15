import {SideberLayout} from '@/components/layout/SideberLayout';
import PageHeader from '@/components/partials/page-header';
import OrdersDriversList from '@/views/ordersDrivers/OrderLists';

type Props = {};

export default function OrdersDrivers({}: Props) {
    return (
        <SideberLayout>
            <div className="drivers-main">
                <PageHeader title="Sotib Olingan Ta'riflar"></PageHeader>
                <OrdersDriversList />
            </div>
        </SideberLayout>
    );
}
