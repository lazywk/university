import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import { useAppDispatch } from "@/store"
import { fetchDriverDetail } from "@/store/drivers"
import EditDriverForm from "@/views/drivers/edit-driver-form"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

type Props = {}

export default function EditDriver({ }: Props) {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchDriverDetail(Number(id)))
    }, [])


    return (
        <SideberLayout>
            <PageHeader title="Haydovchi ma'lumotlarini tahrirlash" />
            <EditDriverForm />
        </SideberLayout>
    )
}