import { usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DrawerMenuButton } from './DrawerMenuButton';

const SCREEN_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  orders: 'Orders',
  inventory: 'Inventory',
};

export function DrawerHeader() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const routeName = pathname.split('/').filter(Boolean).pop() ?? 'dashboard';
  const title = SCREEN_TITLES[routeName] ?? 'ShopEase';

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <DrawerMenuButton />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    paddingRight: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#006C47',
  },
});
