import { useDrawer } from '@/admin/viewmodels/use-drawer';
import { Drawer } from '@/components/drawer/Drawer';
import { useDrawerControls } from '@/components/drawer/DrawerContext';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { CategoryService } from '@/categories/services/category.service';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 16;
const GRID_GAP = 12;
const CARD_WIDTH = (width - SCREEN_PADDING * 2 - GRID_GAP) / 2;

interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
  isNew?: boolean
  category: string
}
const DEFAULT_CATEGORIES = [
  "All categories",
  "Calzado Urbano",
  "Ropa urbana",
  "Comida",
  "Electronics",
  "VideoGames",
];
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Premium Audio",
    description: "Wireless Noise Cancelling",
    price: 299.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    category: "Electronics",
  },
  {
    id: "2",
    title: "Eon Classic Wrist",
    description: "Genuine Leather Strap",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    category: "Ropa urbana",
  },
  {
    id: "3",
    title: "Velocity Running",
    description: "Peak Performance Gear",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    category: "Calzado Urbano",
  },
  {
    id: "4",
    title: "Insta-Capture",
    description: "Vintage Aesthetics",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop",
    category: "Electronics",
  },
  {
    id: "5",
    title: "Console Controller",
    description: "Built for Next-Gen Gaming",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    category: "VideoGames",
  },
  {
    id: "6",
    title: "Sneaker Urbano Casual",
    description: "Zapatos urbanos para uso diario",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    category: "Calzado Urbano",
  },
  {
    id: "7",
    title: "Camisa Oversize Street",
    description: "Estilo urbano 100% algodón",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    category: "Ropa urbana",
  },
  {
    id: "8",
    title: "Combo Snack & Burger",
    description: "Comida rápida y aperitivos",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=600&auto=format&fit=crop",
    category: "Comida",
  }
];

export default function DashboardScreen() {
  const router = useRouter();
  const { token } = useAuth()
  const { openDrawer } = useDrawerControls();
  const { profile } = useDrawer()
  const [selectedCategory, SetSelectedCategory] = useState(DEFAULT_CATEGORIES[0])
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES)
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) return;
      setIsLoadingCategories(true)
      try {
        const data = await CategoryService.getCategories(token)
        const categoryNames = data.map((category) => category.name).filter(Boolean)
        setCategories(Array.from(new Set(["All categories", ...categoryNames, ...DEFAULT_CATEGORIES])))
      } catch (error) {
        console.error("Error fetching categories:", error instanceof Error ? error.message : "Unknown error")
      } finally {
        setIsLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [token])

  const [searchQuery, setSearchQuery] = useState("")

  //filtrar dinamicamente los productos segun la categoria
  const filteredProductsByCategory = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === "All categories"
        || product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()

      const matchSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <SafeAreaView style={styles.container}>
      {/**Omitir el drawer por defecto */}
      <Drawer.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={30} color="#005c3a" />
        </TouchableOpacity>
        <Text style={styles.logoText}>Shop Ease</Text>

        <TouchableOpacity style={styles.profileContainer}
          onPress={() => router.push("/(protected)/profile")}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImage} />
        </TouchableOpacity>
      </View>


      <View style={styles.searchContainer}>
        <Ionicons name='search-outline' size={20} style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholder='Search Products'
        />
      </View>
      {/* CATEGORIES */}
      <View style={styles.categoryWrapper} >
        {isLoadingCategories ?
          (<ActivityIndicator color="#005C3A" size="small" />) :
          (
            <FlatList
              contentContainerStyle={styles.categoriesList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = item === selectedCategory
                return (
                  <TouchableOpacity
                    onPress={() => SetSelectedCategory(item)}
                    style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}>
                    <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]} >{item}</Text>
                  </TouchableOpacity>
                ) 
              }}
            />
          )
        }

      </View>

      {/* PRODUCT CARDS*/}
      <View style={styles.productListWrapper}>
        <FlatList
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.gridRowSpace}
          data={filteredProductsByCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="bag-handle-outline" size={54} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No hay productos</Text>
              <Text style={styles.emptySubtitle}>
                No se encontraron productos en la categoría "{selectedCategory}".
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>

              <View style={styles.imageWrapper} >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                {item.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription} >{item.description} </Text>

                <View style={styles.priceRow}>
                  <Text>{item.price.toFixed(2)} </Text>
                  <TouchableOpacity style={styles.cartBtn}>
                    <Ionicons name='cart-outline' size={16} color="#FFF" />
                  </TouchableOpacity>

                </View>

              </View>
            </View>
          )}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14
  },
  menuButton: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005c3a',
  },
  profileContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1
  },
  avatarImage: {
    width: 40,
    height: 40
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5D8',
    borderRadius: 14
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
    padding: 0
  },
  categoryWrapper: {
    maxHeight: 50,
    marginBottom: 16
  },
  categoriesList: {
    alignItems: "center",
  },
  categoryItem: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 24,
    marginRight: 10
  },
  categoryItemSelected: {
    backgroundColor: "#005C3A",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151"
  },
  categoryTextSelected: {
    color: '#FFF'
  },
  /* ESTILOS PARA LAS TARJETAS*/
  productListWrapper: {
    flex: 1,
  },
  productList: {
    paddingBottom: 24,
  },
  gridRowSpace: {
    gap: GRID_GAP,
    marginBottom: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  imageWrapper: {
    height: 140,
    width: "100%",
    backgroundColor: "#F3F4F6",
    position: 'relative',
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: "#005c3a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  newBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: 'bold',

  },
  productInfo: {
    padding: 12,

  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#1f2937",
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 8
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cartBtn: {
    backgroundColor: "#00B074",
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 15
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
});
