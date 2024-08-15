
export interface AppStateTypes {
    theme: 'dark' | 'light'
    defaultTheme: 'light'
    menuType: 'full' | 'collepse'
}

export interface AppAuthTypes {
    isLogin: boolean
    token: string | null
    role:any
}

export interface LoginProps {
    phone: string
    password: string
}


export interface NavigationTypes {
    name: string
    icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
    path: string
    childrens: string[]
    }

export interface CarItemType {
    id: number
    color: string
    number: string
    model: string
}

export interface DriverItemType {
    id: number
    phone: string
    wallet: string
    first_name: string
    car: {
        id: number
        color: string
        number: string
        model: string
    }
}


export interface OrdersItemType {
    id: number
    name: string
}


export interface OrdersItemTypeDrivers {
    id: number
    lat: string
    lon: string
    client: string
    first_name: string
    phone: string
    full_name: string
}

export interface DriverDetalType {
    id: number,
    first_name: string,
    phone: string,
    wallet: string,
    auth_status: string,
    image: string | null,
    model: string,
    number: string,
    color: string
}

export interface DriversState {
    drivers: DriverItemType[],
    isPending: boolean
    driverData: DriverDetalType | null | undefined,
    pageCount: number,
}

export interface OrdersState {
    orders: OrdersItemType[],
    isPending: boolean,
    pageCount: number,
    rooms: {
        id: number,
        name: string
    }[],
    students: {
        id: number
        first_name: string
        phone: string
        group: string
    }[]
}

export interface OrdersStateDrivers {
    ordersDrivers: OrdersItemTypeDrivers[],
    isPending: boolean,
    pageCount: number,
}

export interface Client {
    id: string | number;
    full_name: string;
    phone: string;
}


export interface ClientsState {
    clients: Client[],
    isPending: boolean,
    pageCount: number,
}

export interface TrafficsState {
    traffics: Client[],
    isPending: boolean,
    pageCount: number,
}


