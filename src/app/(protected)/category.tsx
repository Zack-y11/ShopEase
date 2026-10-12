import { CategoryService } from '@/categories/services/category.service';
import { Drawer } from '@/components/drawer/Drawer';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryScreen() {
  const router = useRouter();
  const { token } = useAuth()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [isLoad, setIsLoad] = useState(false)

  const handleSaveCategory = async () => {
    if (!name.trim()) {
      Alert.alert("Campo Requerido, Ingrese el nombre de la categoria")
      return;
    }
    if (!description.trim()) {
      Alert.alert("Campo Requerido, ingrese la descripcion de la categoria")
      return
    }
    if (!token) {
      Alert.alert("Error de sesion, no se encontro el token")
      return;
    }

    setIsLoad(true)
    try {
      const newCategory = await CategoryService.createCategory(name, description, token)
      Alert.alert("Categoria creada", "La categoria " + newCategory.name + " se ha creado correctamente",
        [
          {
            text: "Aceptar",
            onPress: () => {
              setName("")
              setDescription("")
              router.replace('/(protected)/inventory')
            }
          }
        ]
      )
    } catch (error) {
      Alert.alert("Error al guardar la categoria, intente nuevamente", error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setIsLoad(false)
    }

  }



  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/(protected)/inventory')}>
            <Ionicons name="arrow-back-outline" size={26} />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle}>Admin Portal</Text>
            <Text style={styles.headerSubtitle}>Nueva Categoría</Text>
          </View>
          <View style={styles.boxIconContainer}>
            <Ionicons name="archive-outline" size={22} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.logoText}>
            Ingresa los datos esenciales para catalogar los productos en el
            inventario
          </Text>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre de la categoría</Text>
              <TextInput style={styles.textInput} placeholder="Dulcería" value={name} onChangeText={setName} editable={!isLoad} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descripción de la categoría</Text>
              <TextInput
                style={styles.textAreaInput}
                placeholder="Escribe los productos que engloban esta categoría"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
                editable={!isLoad}
              />
            </View>

            <TouchableOpacity style={styles.btnSave} onPress={handleSaveCategory} disabled={isLoad}>
              {isLoad ? (<ActivityIndicator size="small" color="#FFFFFF" />) :
                (
                  <>
                    <Ionicons
                      name="checkmark"
                      size={22}
                      color="#FFFFFF"
                      style={styles.checkIcon}
                    />
                    <Text style={styles.btnSaveText}>Guardar categoría</Text>
                  </>
                )
              }

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => router.replace('/(protected)/inventory')}
            >
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F9FAFB',
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 0.8,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#006C47',
    marginTop: 2,
  },
  boxIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  logoText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    fontSize: 14,
    borderRadius: 10,
  },
  textAreaInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  btnSave: {
    backgroundColor: '#006C47',
    height: 48,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkIcon: {
    marginRight: 8,
  },
  btnSaveText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  btnCancel: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancelText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});
