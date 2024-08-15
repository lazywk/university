import { Loader } from "@gravity-ui/uikit";

type Props = {
    loading: boolean
}
const PageLoader = ({ loading = false }: Props) => {

    if (!loading) {
        return <></>
    }

    return (
        <div style={{
            height: '160px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Loader size='l' />
        </div>
    )
}


export default PageLoader