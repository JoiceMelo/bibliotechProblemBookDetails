import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CustomModal from "@/components/customModal";

const DetailsCollectionScreen = ({ route, navigation }) => {
    const { title, description } = route.params;
    const [collection, setCollection] = useState({ title, description, books: books || [] });

    const fetchUpdatedCollection = async () => {
        try {
            let colecoes = await AsyncStorage.getItem('colecoes');
            colecoes = colecoes ? JSON.parse(colecoes) : [];
            const updatedCollection = colecoes.find(c => c.title === title && c.description === description);
            if (updatedCollection) {
                setCollection(updatedCollection);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUpdatedCollection();
        }, [])
    );

    const handleEditCollection = () => {
        navigation.navigate('UpdateCollectionScreen', { title: collection.title, description: collection.description });
    };

    const handleAddBook = () => {
        navigation.navigate('AddBookScreen', { collectionTitle: collection.title });
    };

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
        <ScrollView>
            <Text style={styles.colecaoTitle}>{title}</Text>
            <Text style={styles.colecaoDescription}>{description}</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditCollection}>
                <Text style={styles.buttonText}>Editar coleção</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
                <Text style={styles.buttonText}>Adicionar Livro</Text>
            </TouchableOpacity>
        </ScrollView>

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
    marginTop: -120
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
image: {
width: 150,
    height: 150,
},
message: {
fontSize: 25,
    color: "#000",
    marginVertical: 20,
},
button: {
backgroundColor: "#ac58aa",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
},
buttonText: {
color: "#fff",
    fontSize: 16,
},
addButton: {
backgroundColor: '#ac58aa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
},
addButtonText: {
color: '#fff',
    fontSize: 16,
},
colecoesContainer: {
width: '100%',
    marginTop: 30,
},
colecaoCard: {
backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
},
colecaoTitle: {
fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
},
colecaoDescription: {
fontSize: 16,
    marginBottom: 10,
},
addBookButton: {
backgroundColor: '#ac58aa',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
},
addBookButtonText: {
color: '#fff',
    fontSize: 14,
},
    editButton: {
        backgroundColor: '#ac58aa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 100
    },
});

export default DetailsCollectionScreen;
