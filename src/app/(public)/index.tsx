import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLogin } from "../../auth/viewmodels/use-login";
import { useRouter } from "expo-router";


export default function LoginScreen() {
  const { isPasswordVisible, tooglePasswordVisible,
    email, setEmail, password, setPassword, handleLogin,
    isLoading, errorMessage } = useLogin()
  const router = useRouter()

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather name="shopping-bag" size={22} color="#fff" />
          </View>
          <Text style={styles.appNameLabel}>
            ShopEasy
          </Text>
          <Text style={styles.welcomeLabel}>
            Welcome back! Please enter your details
          </Text>
        </View>

        <View style={styles.card}>

          {errorMessage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {errorMessage}
              </Text>
            </View>
          )} 

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#6B7280" />
            <TextInput style={styles.input}
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail} />
          </View>

          <View style={styles.passwordRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#6B7280" />
            <TextInput style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="*************"
              secureTextEntry={isPasswordVisible ? true : false} />
            <TouchableOpacity
              onPress={tooglePasswordVisible}
            >
              <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
            </TouchableOpacity>

          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#006C47" />
          ) : (
            <TouchableOpacity style={styles.buttonLogin}
              onPress={handleLogin}>
              <Text
                style={styles.buttonLoginText}
              >
                Login
              </Text>
            </TouchableOpacity>
          )}


        </View>
        <View style={styles.signUpRow}>
          <Text
            style={styles.signUpText}
          >
            Does have an account?
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(public)/register')}
          >
            <Text
              style={styles.signUpTextLink}
            >
              Sign up for free
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24
  },
  header: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#00B074',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  appNameLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#006C47',
  },
  welcomeLabel: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 25
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 14,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5D8',
    paddingHorizontal: 12,
    marginBottom: 15,
    height: 48,
    borderRadius: 8,

  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 8
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  forgotPassword: {
    color: "#006C47",
    fontWeight: "600",


  },
  buttonLogin: {
    borderWidth: 1,
    backgroundColor: "#006C47",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 8,
  },
  buttonLoginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
  },
  signUpText: {
    fontSize: 14,
    color: "#6B7280"
  },
  signUpTextLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#006c47"
  },
  errorContainer: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FEF2F2',
    borderColor: '#FC5A5A',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500' 
  }
})