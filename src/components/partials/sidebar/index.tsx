
type Props = {}
import { Button, Icon } from '@gravity-ui/uikit'
import './style.scss'
import { Bars } from '@gravity-ui/icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { collepseMenu } from '@/store/theme'
import Menu from './Menu'


export default function Sidebar({ }: Props) {

    const { menuType } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()

    const toggleMenu = () => {
        dispatch(collepseMenu())
    }

    return (
        <div className={`sidebar ${menuType === 'collepse' ? 'sidebar-close' : ''}`}>
            <div className="sidebar-top">
                <h3>Logo</h3>
                <Button view='flat' size="l" onClick={toggleMenu}>
                    <Icon data={Bars} size={18} />
                </Button>
            </div>
            <div className="sidebar-menu">
                <Menu />
            </div>
        </div>
    )
}