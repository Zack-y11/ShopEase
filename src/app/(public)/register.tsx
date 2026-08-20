import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useRegister } from "../../auth/viewmodels/use-register";

export default function RegisterScreen() {
    const router = useRouter();
    const {
        fullName,
        setFullName,
        lastname,
        setLastname,
        phone,
        setPhone,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        errorMessage,
        handleRegister,
    } = useRegister();

    const submitRegistration = async () => {
        const registered = await handleRegister();

        if (registered) {
            router.replace("/(public)");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Create an account</Text>

                    {errorMessage && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    )}

                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="user" size={20} color="#9CA3AF" />
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            autoCapitalize="words"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <Text style={styles.label}>Last Name</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="user" size={20} color="#9CA3AF" />
                        <TextInput
                            style={styles.input}
                            placeholder="Smith"
                            autoCapitalize="words"
                            value={lastname}
                            onChangeText={setLastname}
                        />
                    </View>

                    <Text style={styles.label}>Phone</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="phone" size={20} color="#9CA3AF" />
                        <TextInput
                            style={styles.input}
                            placeholder="555 123 4567"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="mail" size={20} color="#9CA3AF" />
                        <TextInput
                            style={styles.input}
                            placeholder="name@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="lock" size={20} color="#9CA3AF" />
                        <TextInput
                            style={styles.input}
                            placeholder="*************"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="shield" size={20} color="#9CA3AF" />
                        <TextInput
                            style={styles.input}
                            placeholder="*************"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#006C47" />
                    ) : (
                        <TouchableOpacity
                            style={styles.buttonRegister}
                            onPress={submitRegistration}
                        >
                            <Text style={styles.buttonRegisterText}>Register</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.signRow}>
                    <Text style={styles.signInText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/(public)")}>
                        <Text style={styles.signTextLink}>Login Here</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
        justifyContent: "center",
        paddingTop: 40,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#F3F4F6",
        padding: 24,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D1D5D8",
        paddingHorizontal: 12,
        marginBottom: 15,
        height: 48,
        borderRadius: 8,
    },
    input: {
        flex: 1,
        height: "100%",
        marginLeft: 8,
    },
    buttonRegister: {
        borderWidth: 1,
        backgroundColor: "#006C47",
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        borderRadius: 8,
    },
    buttonRegisterText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    signInText: {
        fontSize: 14,
        color: "#6b7280",
    },
    signTextLink: {
        fontSize: 14,
        color: "#006C47",
        fontWeight: "bold",
        marginLeft: 5,
    },
    errorContainer: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: "#FEF2F2",
        borderColor: "#FC5A5A",
    },
    errorText: {
        color: "#DC2626",
        fontSize: 15,
        textAlign: "center",
        fontWeight: "500",
    },
});