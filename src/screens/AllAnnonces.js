import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Layout,
  Text,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import FilterBar from "../components/utils/FilterBar";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [annonces, setAnnonces] = useState([]);


  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://192.168.43.59:3002/annonces");
      let data = await response.json();
  
      // Adjust the structure of the markers
      data = data.map((marker) => ({
        coordinate: {
          latitude: parseFloat(marker.latitude),
          longitude: parseFloat(marker.longitude),
        },
        // Copy other properties of the marker
        ...marker,
      }));
  
      setAnnonces(data);
      setSelectedAnnonce(data[0]); // Set the first announcement as selected
    } catch (error) {
      console.error(error);
    }
  };

  // {
  //   id: 1,
  //   title: "Real Estate 1",
  //   description: "This is a real estate description",
  //   coordinate: {
  //     latitude: 33.5731, // Casablanca
  //     longitude: -7.5898,
  //   },
  // },
  // {
  //   id: 2,
  //   title: "Real Estate 2",
  //   description: "This is another real estate description",
  //   coordinate: {
  //     latitude: 35.7595, // Tangier
  //     longitude: -5.8340,
  //   },
  // },
  // {
  //   id: 3,
  //   title: "Real Estate 3",
  //   description: "This is yet another real estate description",
  //   coordinate: {
  //     latitude: 33.8731, // Meknes
  //     longitude: -5.5474,
  //   },
  // },
  // Add more default items here
  const [selectedAnnonce, setSelectedAnnonce] = useState(annonces[0]);

  useEffect(() => {
    // Fetch your annonces here and set them with setAnnonces
    fetchAnnouncements();
  }, []);

  const handleAnnonceSelect = (annonce) => {
    setSelectedAnnonce(annonce);
  };

  return (
    <Layout>
      {/* ... */}
      <TopNav
        middleContent="Annonces"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : "#191921"}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      
      <FilterBar />
      <MapView
        style={{ flex: 1 }}
        region={
          selectedAnnonce
            ? {
                latitude: selectedAnnonce.coordinate.latitude,
                longitude: selectedAnnonce.coordinate.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : null
        }
      >
        {annonces.map((annonce) => (
          <Marker
            key={annonce.id}
            coordinate={annonce.coordinate}
            title={annonce.title}
            description={annonce.description}
          />
        ))}
      </MapView>
      <View style={{ flex: 1 }}>
        <FlatList
          data={annonces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAnnonceSelect(item)}>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
              
                
                <Text>type: {item.type_bien} m²</Text>
                <Text>Prix: ${item.prix_bien}</Text>
                <Text>Description: {item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Layout>
  );
}