import { NavigationTypes } from "@/interfaces/app";
import { ChartMixed, Persons, SealCheck, PersonPlus, Folders, BellDot, GearDot, GraduationCap, Briefcase } from '@gravity-ui/icons';

// Define your navigation items
const adminNavigation: NavigationTypes[] = [
    {
        name: "Bosh sahifa",
        icon: ChartMixed,
        path: '/dashboard',
        childrens: []
    },
    {
        name: "Yo'qlamalar",
        icon: PersonPlus,
        path: '/orders',
        childrens: ['/create-order', '/floor-detail', '/create-student', '/add-student']
    },
    {
        name: "Xodimlar",
        icon: Briefcase,
        path: '/employes',
        childrens: ['/create-order', '/floor-detail']
    },
    {
        name: "Talabalar",
        icon: GraduationCap,
        path: '/students',
        childrens: ['/create-order', '/floor-detail']
    },
    {
        name: "Statistika",
        icon: SealCheck,
        path: '/statistics',
        childrens: []
    },
    {
        name: "Barcha davomadlar",
        icon: Persons,
        path: '/settings',
        childrens: []
    },
    {
        name: "Guruhlar",
        icon: Folders,
        path: '/clients',
        childrens: []
    },
    {
        name: "Arizalar",
        icon: BellDot,
        path: '/arizalar',
        childrens: ['/create-application']
    },
    {
        name: "Sozlamalar",
        icon: GearDot,
        path: '/settings',
        childrens: ['/create-setting']
    }
];

const studentNavigation: NavigationTypes[] = [
    {
        name: "Bosh sahifa",
        icon: ChartMixed,
        path: '/dashboard',
        childrens: []
    },
    {
        name: "Barcha davomadlar",
        icon: Persons,
        path: '/settings',
        childrens: []
    },
    {
        name: "Arizalar",
        icon: BellDot,
        path: '/arizalar',
        childrens: ['/create-application']
    }
];

// Function to get navigation items based on user role
export function getNavigationForRole(role: string): NavigationTypes[] {
    switch (role) {
        case 'employee':
            return adminNavigation;
        case 'student':
            return studentNavigation;
        default:
            return [];
    }
}
