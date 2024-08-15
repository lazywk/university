import {SideberLayout} from '@/components/layout/SideberLayout';
import PageHeader from '@/components/partials/page-header';
import { FolderPlus } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

type Props = {};

export default function Traffics({}: Props) {
    const navigate = useNavigate()

    return (
        <SideberLayout>
            <div className="drivers-main">
                <PageHeader title="Arizalar">
                <Button size="l" view='outlined-success' onClick={() => navigate('/create-ariza')}>
                        <Icon data={FolderPlus} size={18} />
                        Yangi yaratish
                    </Button>
                </PageHeader>
            </div>
        </SideberLayout>
    );
}
