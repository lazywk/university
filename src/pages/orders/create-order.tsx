import {SideberLayout} from '@/components/layout/SideberLayout';
import PageHeader from '@/components/partials/page-header';
import CreateOrdersForm from '@/views/orders/create-order-form';
import 'leaflet/dist/leaflet.css';

type Props = {};

export default function CreateOrder({}: Props) {
    return (
        <SideberLayout>
            <PageHeader title="Yangi buyurtma" />
            <CreateOrdersForm />
        </SideberLayout>
    );
}
