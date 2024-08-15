import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import { useAppDispatch } from "@/store"
import { fetchDriverDetail } from "@/store/drivers"
import DriverDetailView from "@/views/drivers/driver-detail"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

type Props = {}

export default function DriverDetail({ }: Props) {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchDriverDetail(Number(id)))
    }, [])


    return (
        <SideberLayout>
            <PageHeader title="Haydovchi ma'lumotlari" />
            <DriverDetailView />
        </SideberLayout>
    )
}