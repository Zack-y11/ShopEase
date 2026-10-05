import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDrawerControls } from '@/components/drawer/DrawerContext';
import { Drawer } from '@/components/drawer/Drawer';
import { useDrawer } from '@/admin/viewmodels/use-drawer';

interface InventoryItem {
  id: string;
  title: string;
  sku: string;
  stock: number;
  image: string;
}

const INVENTORY: InventoryItem[] = [
  {
    id: '1',
    title: 'Premium Audio',
    sku: 'AUD-299',
    stock: 18,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Eon Classic Wrist',
    sku: 'FSH-145',
    stock: 4,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Velocity Running',
    sku: 'FSH-089',
    stock: 32,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Insta-Capture',
    sku: 'ELC-120',
    stock: 0,
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Console Controller',
    sku: 'GAM-069',
    stock: 11,
    image:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
  },
];

function stockLabel(stock: number) {
  if (stock === 0) {
    return { text: 'Out of stock', color: '#B91C1C', background: '#FEE2E2' };
  }

  if (stock >= 1 && stock <= 5) {
    return { text: 'Low stock', color: '#92400E', background: '#FEF3C7' };
  }

  return { text: 'In stock', color: '#065F46', background: '#D1FAE5' };
}

export default function InventoryScreen() {
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
        <Text style={styles.logoText}>Inventory</Text>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => router.push('/(protected)/profile')}
        >
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.newCategoryButton}
        onPress={() => router.push('/(protected)/category')}
      >
        <Ionicons name="add-circle-outline" size={20} color="#006C47" />
        <Text style={styles.newCategoryText}>New Category</Text>
      </TouchableOpacity>

      <FlatList
        data={INVENTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const status = stockLabel(item.stock);

          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.cardBody}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.sku}>{item.sku}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.units}>{item.stock} units</Text>
                  <View
                    style={[styles.statusBadge, { backgroundColor: status.background }]}
                  >
                    <Text style={[styles.statusText, { color: status.color }]}>
                      {status.text}
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
  newCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#006C47',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
  },
  newCategoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#006C47',
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
  productTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sku: {
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
  units: {
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
