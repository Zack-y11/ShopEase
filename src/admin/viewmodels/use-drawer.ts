import { Href, usePathname, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { useDrawerControls } from '@/components/drawer/DrawerContext';
import { useAuth } from '@/context/AuthContext';
import { AdminProfile, DrawerItemOption } from '../models/drawer.model';

const PROTECTED_ROUTES = {
    dashboard: '/(protected)/dashboard',
    orders: '/(protected)/orders',
    inventory: '/(protected)/inventory',
} as const;

type ProtectedRouteName = keyof typeof PROTECTED_ROUTES;

export function useDrawer() {
    const router = useRouter();
    const pathname = usePathname();
    const { clearSession } = useAuth();
    const { closeDrawer } = useDrawerControls();

    const [profile] = useState<AdminProfile>({
        name: 'Admin',
        role: 'System Management',
        avatarUrl: 'https://res.cloudinary.com/dkeu1rgrm/image/upload/v1776814225/coeSRn2R_rejkq7.jpg',
        version: '4.4.4',
    });

    const navigationOptions: DrawerItemOption[] = [
        { name: 'dashboard', label: 'Dashboard', icon: 'grid' },
        { name: 'orders', label: 'Orders', icon: 'package' },
        { name: 'inventory', label: 'Inventory', icon: 'archive' },
    ];

    const isActiveRoute = useCallback(
        (routeName: string) => pathname.includes(routeName),
        [pathname],
    );

    const handleNavigate = useCallback(
        (routeName: string) => {
            closeDrawer();

            const route = PROTECTED_ROUTES[routeName as ProtectedRouteName];
            if (route) {
                router.push(route as Href);
            }
        },
        [closeDrawer, router],
    );

    const handleLogout = useCallback(async () => {
        closeDrawer();
        await clearSession();
        router.replace('/(public)');
    }, [clearSession, closeDrawer, router]);

    return {
        profile,
        navigationOptions,
        handleNavigate,
        handleLogout,
        isActiveRoute,
    };
}
