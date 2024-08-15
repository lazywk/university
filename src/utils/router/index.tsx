// import Dashboard from "@/pages/dashboard";
import Dashboard from '../../pages/dashboard';
import { PrivateRouter } from './private-router';
import { urls } from './urls';

import Login from "../../pages/login";
import App from "../../App";
import Drivers from "@/pages/drivers";
import Settings from "@/pages/settings";
import CreateDriver from "@/pages/drivers/create";
import Clients from "@/pages/clients";
import OrdersDrivers from "@/pages/orders-drivers";
import EditDriver from "@/pages/drivers/edit";
import Orders from "@/pages/orders/orders";
import CreateOrder from "@/pages/orders/create-order";
import CreateStudent from "@/pages/students/students";
import AddStudent from "@/pages/students/CreateStudent";
import NotFound from "@/pages/404";
import Traffics from '@/pages/traffics';
import DriverDetail from '@/pages/drivers/detail';
import FloorDetail from '@/pages/orders/floor-detail';
import RoomDetail from '@/pages/orders/room-detail';
import Employes from '@/pages/employes'
import Arizalar from '@/pages/ariza/index'
import CreateAriza from '@/pages/ariza/arizalar'
import Students from '@/pages/students/page'

const privateRoutes: any = [
    {
        path: urls.INDEX,
        element: <App />,
    },
    {
        path: urls.ORDERS,
        element: <Orders />,
    },
    {
        path: urls.DASHBOARD,
        element: <Dashboard />,
    },
    {
        path: urls.DRIVERS,
        element: <Drivers />,
    },

    {
        path: urls.ORDERSDRIVERS,
        element: <OrdersDrivers />,
    },
    {
        path: urls.TRAFFICS,
        element: <Traffics />,
    },
    {
        path: urls.SETTINGS,
        element: <Settings />,
    },
    {
        path: urls.CREATE_DRIVER,
        element: <CreateDriver />,
    },
    {
        path: urls.CREATE_STUDENT,
        element: <CreateStudent />,
    },
    {
        path: urls.ADD_STUDENT,
        element: <AddStudent/>,
    },
    {
        path: urls.STUDENTS,
        element: <Students/>,
    },
    {
        path: urls.CLIENTS,
        element: <Clients />,
    },
    {
        path: urls.CREATE_ORDER,
        element: <CreateOrder />,
    },
    {
        path: urls.EDIT_DRIVER,
        element: <EditDriver />,
    },
    {
        path: urls.DETAIL_DRIVER,
        element: <DriverDetail />,
    },
    {
        path: urls.FLOOR_DETAIL,
        element: <FloorDetail />,
    },
    {
        path: urls.ROOM_DETAIL,
        element: <RoomDetail />,
    },
    {
        path: urls.EMPLOYES,
        element: <Employes/>,
    },
    {
        path: urls.ARIZALAR,
        element: <Arizalar/>,
    },
    {
        path: urls.CREATE_ARIZA,
        element: <CreateAriza />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
].map((item) => ({
    path: item.path,
    element: <PrivateRouter>{item.element} </PrivateRouter>,
}));

export const router: any = [
    ...[
        {
            path: urls.LOGIN,
            element: (
                <PrivateRouter>
                    <Login />
                </PrivateRouter>
            ),
        },
    ],
    ...privateRoutes,
];
