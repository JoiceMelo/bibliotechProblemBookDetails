import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CustomModal from "@/components/customModal";
import { useRoute } from '@react-navigation/native';

const BookDetailsScreen = () => {
    const route = useRoute();
    const { title, author, year, edition, pages, isbn, description, status, categories } = route.params.book;

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Image
                        source={require('../assets/images/images-project/bibliotech.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.pageTitle}>Bibliotech</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                    <Ionicons name="person-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.bookDetailCard}>
                <Image
                    source={require("../assets/images/images-project/books.jpg")}
                    style={styles.thumbnail}
                />
                <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{title}</Text>
                    <Text style={styles.bookField}>Autor: {author}</Text>
                    <Text style={styles.bookField}>Ano: {year}</Text>
                    <Text style={styles.bookField}>Edição: {edition}</Text>
                    <Text style={styles.bookField}>Páginas: {pages}</Text>
                    <Text style={styles.bookField}>ISBN: {isbn}</Text>
                    <Text style={styles.bookField}>Status: {status}</Text>
                    <Text style={styles.bookField}>Categorias: {Object.keys(categories)
                        .filter(category => categories[category])
                        .join(', ')}</Text>
                    <Text style={styles.bookField}>Descrição: {description}</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.buttonText}>Editar coleção</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text></Text>
                </View>
            </View>
            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                user={user}
                handleSettings={handleSettings}
                handleLogout={handleLogout}
            />
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
        marginTop: -260
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 126,
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
        marginTop: 126
    },
    bookDetailCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        width: '90%',
        marginTop: 5
    },
    thumbnail: {
        width: 60,
        height: 90,
        borderRadius: 5,
    },
    bookInfo: {
        marginLeft: 20,
        flex: 1,
    },
    bookTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6A1B9A',
        marginBottom: 8,
    },
    bookField: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
    },
    editButton: {
        backgroundColor: '#ac58aa',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
});

export default BookDetailsScreen;