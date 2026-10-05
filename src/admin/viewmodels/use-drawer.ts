import { Href, usePathname, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { useDrawerControls } from '@/components/drawer/DrawerContext';
import { useAuth } from '@/context/AuthContext';
import { AdminProfile, DrawerItemOption } from '../models/drawer.model';

const FALLBACK_AVATAR = 'https://i.pravatar.cc/150?u=shopease-admin';

const PROTECTED_ROUTES = {
    dashboard: '/(protected)/dashboard',
    orders: '/(protected)/orders',
    inventory: '/(protected)/inventory',
    category: '/(protected)/category',
    'create-product': '/(protected)/create-product',
} as const;

type ProtectedRouteName = keyof typeof PROTECTED_ROUTES;

export function useDrawer() {
    const router = useRouter();
    const pathname = usePathname();
    const { clearSession, user } = useAuth();
    const { closeDrawer } = useDrawerControls();

    const profile = useMemo<AdminProfile>(() => {
        const fullName = [user?.name, user?.lastName]
            .filter((value): value is string => Boolean(value?.trim()))
            .join(' ')
            .trim();

        return {
            name: fullName || 'Admin User',
            role: user?.roles?.[0]?.name || 'System Management',
            avatarUrl: user?.image || FALLBACK_AVATAR,
            version: '4.4.4',
        };
    }, [user]);

    const navigationOptions: DrawerItemOption[] = [
        { name: 'dashboard', label: 'Dashboard', icon: 'grid' },
        { name: 'orders', label: 'Orders', icon: 'package' },
        {
            name: 'inventory',
            label: 'Inventory',
            icon: 'archive',
            subItems: [
                { name: 'category', label: 'Category', icon: 'folder' },
                { name: 'create-product', label: 'Products', icon: 'file-text' },
            ],
        },
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
