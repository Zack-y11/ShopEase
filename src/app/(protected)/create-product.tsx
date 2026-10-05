import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
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

import { Drawer } from '@/components/drawer/Drawer';

export default function CreateProductScreen() {
  const router = useRouter();
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/(protected)/dashboard')}>
            <Ionicons name="arrow-back-outline" size={26} />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle}>ADMIN PORTAL</Text>
            <Text style={styles.headerSubtitle}>Nuevo Producto</Text>
          </View>
          <View style={styles.boxIconContainer}>
            <Ionicons name="cube-outline" size={22} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather
                name="clipboard"
                size={20}
                color="#006C47"
                style={styles.cardHeaderIcon}
              />
              <Text style={styles.cardTitle}>Información General</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre del producto</Text>
              <TextInput style={styles.textInput} placeholder="Ej. Zapato Nike" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Categoría</Text>
              <TouchableOpacity style={styles.selectorInput}>
                <Text style={styles.selectorText}>Selecciona la categoría</Text>
                <Feather name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SKU / Código de Barra</Text>
              <View style={styles.inputWithIcon}>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <TextInput style={styles.textInputScan} placeholder="PR-0001" />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descripción detallada</Text>
              <TextInput
                style={styles.textAreaInput}
                placeholder="Describe los atributos principales: materiales, confección..."
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={2000}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{description.length}/2000</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather
                name="dollar-sign"
                size={20}
                color="#006C47"
                style={styles.cardHeaderIcon}
              />
              <Text style={styles.cardTitle}>Precios e Inventario</Text>
            </View>

            <View style={styles.rowCols}>
              <View style={styles.column}>
                <Text style={styles.inputLabel}>Precio regular</Text>
                <View style={styles.inputPriceWrapper}>
                  <Text style={styles.dollarSign}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="0.0"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.column}>
                <Text style={styles.inputLabel}>Precio de oferta</Text>
                <View style={styles.inputPriceWrapper}>
                  <Text style={styles.dollarSign}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="0.0"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={styles.rowCols}>
              <View style={styles.column}>
                <Text style={styles.inputLabel}>Stock inicial</Text>
                <View style={styles.inputPriceWrapper}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="50"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.column}>
                <Text style={styles.inputLabel}>Stock mínimo</Text>
                <View style={styles.inputPriceWrapper}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="5"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.btnSave}>
              <Ionicons
                name="checkmark-outline"
                size={22}
                color="#FFFFFF"
                style={styles.checkIcon}
              />
              <Text style={styles.btnSaveText}>Guardar producto</Text>
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
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
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
  selectorInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 14,
    color: '#6B7280',
  },
  inputWithIcon: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInputScan: {
    flex: 1,
    padding: 0,
    fontSize: 14,
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
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  counterText: {
    fontSize: 12,
    color: '#6B7280',
  },
  rowCols: {
    flexDirection: 'row',
    gap: 8,
  },
  column: {
    flex: 1,
    marginBottom: 5,
  },
  inputPriceWrapper: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dollarSign: {
    marginRight: 6,
  },
  priceInput: {
    flex: 1,
    padding: 0,
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
    marginTop: 15,
  },
  checkIcon: {
    marginRight: 8,
  },
  btnSaveText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});
