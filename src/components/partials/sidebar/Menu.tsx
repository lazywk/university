import { getNavigationForRole } from "@/utils/navigation";
import MenuItem from "./MenuItem";
import { useState, useEffect } from 'react';
import { NavigationTypes } from "@/interfaces/app";

type Props = {}

export default function Menu({}: Props) {
    const [navigationItems, setNavigationItems] = useState<NavigationTypes[]>([]);
    const userRole = localStorage.getItem('role') || 'guest';

    useEffect(() => {
        const items = getNavigationForRole(userRole);
        setNavigationItems(items);
    }, [userRole]);

    return (
        <div className="menu">
            {navigationItems.map((menuItem, key) => (
                <MenuItem menuItem={menuItem} key={key} />
            ))}
        </div>
    );
}
