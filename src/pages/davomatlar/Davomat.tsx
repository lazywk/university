import { SideberLayout } from "@/components/layout/SideberLayout"
import PageHeader from "@/components/partials/page-header"
import { useAppDispatch } from "@/store"
import { fetchRooms } from "@/store/orders"
import Davaomatlar from "@/pages/davomatlar/page"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

type Props = {}

export default function FloorDetail({ }: Props) {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchRooms(Number(id)))
    }, [])


    return (
        <SideberLayout>
            <PageHeader title="Davomatlar" />
            <Davaomatlar />
        </SideberLayout>
    )
}