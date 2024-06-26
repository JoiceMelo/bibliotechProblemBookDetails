import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";
import CustomModal from "@/components/customModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Leituras = () => {
    const [status, setStatus] = useState(null); // Estado para armazenar a bolinha selecionada
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState<{ firstName: string, lastName: string, email: string } | null>(null);

    const handleSettings = () => {
        navigation.navigate('UserEdition');
        setModalVisible(false);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error during logout:', error)
        }
    }
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Image
                        source={require("../assets/images/images-project/bibliotech.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.pageTitle}>Bibliotech</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                    <Ionicons name="person-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.statusTitle}>Status de leitura</Text>
            <View style={styles.statusContainer}>
                <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusChange('notRead')}>
                    <View style={[styles.statusCircle, status === 'notRead' && styles.selectedCircle]} />
                    <Text style={styles.statusText}>Não lido</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusChange('reading')}>
                    <View style={[styles.statusCircle, status === 'reading' && styles.selectedCircle]} />
                    <Text style={styles.statusText}>Lendo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusChange('read')}>
                    <View style={[styles.statusCircle, status === 'read' && styles.selectedCircle]} />
                    <Text style={styles.statusText}>Lido</Text>
                </TouchableOpacity>
            </View>

            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                user={user}
                handleSettings={handleSettings}
                handleLogout={handleLogout}
            />
            <Text style={styles.statusSubTitle}>Não há livros com esse status</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#be7abb",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 60,
        marginTop: -170
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 45,
        height: 45,
        marginRight: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    iconButton: {
        padding: 10,
    },
    statusTitle: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center"
    },
    statusSubTitle: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
        marginTop: 70
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    statusItem: {
        alignItems: "center",
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 5,
        backgroundColor: "#fff", // Cor padrão da bolinha não selecionada
    },
    selectedCircle: {
        backgroundColor: "#000", // Cor da bolinha selecionada
    },
    statusText: {
        fontSize: 16,
        color: "#000",
    },
});

export default Leituras;