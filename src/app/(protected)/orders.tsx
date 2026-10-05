import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDrawerControls } from '@/components/drawer/DrawerContext';
import { Drawer } from '@/components/drawer/Drawer';
import { useDrawer } from '@/admin/viewmodels/use-drawer';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

interface Order {
  id: string;
  product: string;
  customer: string;
  total: number;
  status: OrderStatus;
  image: string;
}

const ORDERS: Order[] = [
  {
    id: 'ORD-1042',
    product: 'Premium Audio',
    customer: 'Maria Lopez',
    total: 299,
    status: 'Shipped',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ORD-1041',
    product: 'Eon Classic Wrist',
    customer: 'James Carter',
    total: 145,
    status: 'Processing',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ORD-1038',
    product: 'Velocity Running',
    customer: 'Sofia Nguyen',
    total: 89.99,
    status: 'Delivered',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
  },
];

const STATUS_COLORS: Record<OrderStatus, { background: string; text: string }> = {
  Processing: { background: '#FEF3C7', text: '#92400E' },
  Shipped: { background: '#DBEAFE', text: '#1E40AF' },
  Delivered: { background: '#D1FAE5', text: '#065F46' },
};

export default function OrdersScreen() {
  const { openDrawer } = useDrawerControls();
  const router = useRouter();
  const { profile } = useDrawer();

  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={30} color="#005C3A" />
        </TouchableOpacity>
        <Text style={styles.logoText}>Orders</Text>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => router.push('/(protected)/profile')}
        >
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImage} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const statusColors = STATUS_COLORS[item.status];

          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.cardBody}>
                <Text style={styles.orderId}>{item.id}</Text>
                <Text style={styles.productTitle}>{item.product}</Text>
                <Text style={styles.customer}>{item.customer}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.total}>${item.total.toFixed(2)}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusColors.background },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: statusColors.text }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  menuButton: {
    padding: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005C3A',
  },
  profileContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  avatarImage: {
    width: 40,
    height: 40,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  productImage: {
    width: 92,
    height: 92,
  },
  cardBody: {
    flex: 1,
    padding: 12,
  },
  orderId: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 2,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  customer: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#005C3A',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});
