import { useDrawer } from '@/admin/viewmodels/use-drawer';
import { CategoryResponse, CategoryService } from '@/categories/services/category.service';
import { Drawer } from '@/components/drawer/Drawer';
import { useDrawerControls } from '@/components/drawer/DrawerContext';
import { useAuth } from '@/context/AuthContext';
import { ProductItem } from '@/products/models/product.model';
import { ProductService } from '@/products/services/product.service';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 16;
const GRID_GAP = 12;
const CARD_WIDTH = (width - SCREEN_PADDING * 2 - GRID_GAP) / 2;
const PRODUCT_IMAGE_FALLBACK = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop";

export default function DashboardScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const { openDrawer } = useDrawerControls();
  const { profile } = useDrawer();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        setCategories([]);
        setCategoryError(null);
        setIsLoadingCategories(false);
        return;
      }

      let active = true;
      setIsLoadingCategories(true);
      setCategoryError(null);

      CategoryService.getCategories(token)
        .then((data) => {
          if (!active) {
            return;
          }
          setCategories(data);
        })
        .catch((error: unknown) => {
          if (!active) {
            return;
          }
          setCategories([]);
          setCategoryError(
            error instanceof Error && error.message
              ? error.message
              : "Error al cargar las categorías"
          );
        })
        .finally(() => {
          if (!active) {
            return;
          }
          setIsLoadingCategories(false);
        });

      return () => {
        active = false;
      };
    }, [token])
  );

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        setProducts([]);
        setProductError(null);
        setIsLoadingProducts(false);
        return;
      }

      let active = true;
      const categoryId = selectedCategoryId ?? 1;
      setProducts([]);
      setProductError(null);
      setIsLoadingProducts(true);

      ProductService.getProductsByCategoryId(categoryId, token)
        .then((data) => {
          if (!active) {
            return;
          }
          setProducts(data);
        })
        .catch((error: unknown) => {
          if (!active) {
            return;
          }
          setProducts([]);
          setProductError(
            error instanceof Error && error.message
              ? error.message
              : "Error al cargar los productos"
          );
        })
        .finally(() => {
          if (!active) {
            return;
          }
          setIsLoadingProducts(false);
        });

      return () => {
        active = false;
      };
    }, [token, selectedCategoryId])
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      if (!query) {
        return true;
      }
      return (
        product.name.toLowerCase().includes(query) ||
        (product.description ? product.description.toLowerCase().includes(query) : false)
      );
    });
  }, [products, searchQuery]);

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
        {isLoadingCategories ? (
          <ActivityIndicator color="#005C3A" size="small" />
        ) : categoryError ? (
          <Text style={styles.categoryStatusText}>{categoryError}</Text>
        ) : categories.length === 0 ? (
          <Text style={styles.categoryStatusText}>No hay categorías disponibles</Text>
        ) : (
          <FlatList
            contentContainerStyle={styles.categoriesList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => {
              const isSelected = selectedCategoryId === item.id;
              return (
                <TouchableOpacity
                  onPress={() => setSelectedCategoryId(item.id)}
                  style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}>
                  <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]} >{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

      </View>

      {/* PRODUCT CARDS*/}
      <View style={styles.productListWrapper}>
        {isLoadingProducts ? (
          <ActivityIndicator color="#005C3A" size="large" style={styles.productSpinner} />
        ) : productError ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>{productError}</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.productList}
            columnWrapperStyle={filteredProducts.length > 0 ? styles.gridRowSpace : undefined}
            data={filteredProducts}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="bag-handle-outline" size={54} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No hay productos</Text>
                <Text style={styles.emptySubtitle}>
                  No se encontraron productos en la categoría seleccionada.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>

                <View style={styles.imageWrapper} >
                  <Image source={{ uri: item.imageUrl || PRODUCT_IMAGE_FALLBACK }} style={styles.productImage} />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{item.name}</Text>
                  <Text style={styles.productDescription} >{item.description} </Text>

                  <View style={styles.priceRow}>
                    <Text>{Number(item.regularPrice).toFixed(2)} </Text>
                    <TouchableOpacity style={styles.cartBtn}>
                      <Ionicons name='cart-outline' size={16} color="#FFF" />
                    </TouchableOpacity>

                  </View>

                </View>
              </View>
            )}
          />
        )}

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
  categoryStatusText: {
    fontSize: 13,
    color: "#6B7280",
    paddingVertical: 8,
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
  productSpinner: {
    marginTop: 40,
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
