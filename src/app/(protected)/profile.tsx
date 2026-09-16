import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Drawer } from '@/components/drawer/Drawer';
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useAuth } from "@/context/AuthContext";

export default function ProfileScreen() {
    const { user } = useAuth()
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Drawer.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back-outline" size={26} />
                </TouchableOpacity>
                <Text style={styles.logoText}> Shop Ease </Text>

            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.profileCard}>
                    <View style={styles.imageWrapper}>
                        <Image
                            style={styles.profileAvatar}
                            source={{ uri: "https://res.cloudinary.com/dkeu1rgrm/image/upload/v1776814225/coeSRn2R_rejkq7.jpg" }}
                        />
                        <TouchableOpacity style={styles.cameraBtn}>
                            <Ionicons name='camera' size={16} color="#fff" />
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.profileName}>
                        Isaac Natanael Medrano Romero
                    </Text>
                    <Text style={styles.profileSubtitle}>
                        Backend Developer
                    </Text>

                    {/*CARD POINTS */}

                    <View style={styles.cardPoints}>
                        <View style={[styles.cardPointBox, styles.cardOrderColor]}>
                            <Text style={styles.cardBoxLabel}>Orders</Text>
                            <Text style={styles.cardBoxValue}>24</Text>
                        </View>
                        <View style={[styles.cardPointBox, styles.cardPointColor]}>
                            <Text style={styles.cardBoxLabel}>Points</Text>
                            <Text style={styles.cardBoxValue
                            }>1421</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionCard}>
                    <Text style={styles.personalHeader}>Personal Information</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="full name" 
                                value={user?.name || "Usuario No Identificado"}/>

                        </View>

                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Email Adress</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Your email" 
                                value={user?.email || "Usuario Sin Correo"}/>

                        </View>

                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="call-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                keyboardType="phone-pad"
                                style={styles.input}
                                placeholder="Your Number" 
                                value={user?.phone || "Usuario Sin Telefono"} />

                        </View>

                    </View>P
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: "#F3F4F6"
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#005c3a"
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40
    },
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    imageWrapper: {
        position: 'relative',
        marginBottom: 14
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: "#005c3a",
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#fff"
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    profileSubtitle: {
        fontSize: 13,
        color: "#6b7280",
        marginBottom: 20
    },
    cardPoints: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between'
    },
    cardPointBox: {
        flex: 1,
        height: 64,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6
    },
    cardOrderColor: {
        backgroundColor: "#DBEAFE"
    },
    cardPointColor: {
        backgroundColor: "#E2F0FC"
    },
    cardBoxLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: "#4b5563",
        letterSpacing: 1,
        marginBottom: 4
    },
    cardBoxValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#047867"
    },
    sectionCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2
    },
    personalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#111827",
        marginBottom: 18
    },
    inputGroup: {
        marginBottom: 14
    },
    inputLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: "#3b5563",
        letterSpacing: 1,
        marginBottom: 6
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        backgroundColor: "#fff"
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#1f2937",
        paddingVertical: 0
    },
    inputIcon: {

    }

})