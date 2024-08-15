import { Label, Text } from "@gravity-ui/uikit"
import './index.scss'
import { useAppSelector } from "@/store";
import PageLoader from "@/components/elements/Loader";

type Props = {}

const driverDetailKeys: any = {
    id: "Id",
    first_name: "To'liq ismi",
    phone: "Telefon raqam",
    wallet: "Balansi",
    auth_status: "Status",
    image: "Guvohnoma rasmi",
    model: "Mashina modeli",
    number: "Mashina raqami",
    color: "Mashina rangi"
}

export default function DriverDetailView({ }: Props) {

    const { driverData, isPending } = useAppSelector(state => state.drivers)
    const data: any = { ...driverData }


    return (
        <div className="create-driver-form">
            {!isPending ? <div className="row">
                <div className="col-md-6 d-flex flex-column gap-3 mb-3">
                    {
                        driverData && Object.keys(driverData).map((el: string) => (
                            el === 'image' ? "" : <Label theme='info' size='m'>
                                <div key={el} className="d-flex align-items-center">
                                    <Text style={{ minWidth: '150px', textAlign: 'start' }}>{driverDetailKeys[el]}</Text>
                                    {data[el]}
                                </div>
                            </Label>
                        ))
                    }
                </div>
                <div className="col-md-6 d-flex flex-column gap-3 mb-3">
                    <img src={data?.image} width={'100%'} height={'auto'} />
                </div>
            </div> : <PageLoader loading={isPending} />}
        </div>
    )
}