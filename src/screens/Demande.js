import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import FilterBar from "../components/utils/FilterBar";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [annonces, setAnnonces] = useState([
    {
      id: 1,
      title: "Real Estate 1",
      description: "This is a real estate description",
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 2,
      title: "Real Estate 2",
      description: "This is another real estate description",
      coordinate: {
        latitude: 37.78925,
        longitude: -122.4334,
      },
    },
    {
      id: 3,
      title: "Real Estate 3",
      description: "This is yet another real estate description",
      coordinate: {
        latitude: 37.79025,
        longitude: -122.4344,
      },
    },
    // Add more default items here
  ]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(annonces[0]);

  useEffect(() => {
    // Fetch your annonces here and set them with setAnnonces
  }, []);

  const handleAnnonceSelect = (annonce) => {
    setSelectedAnnonce(annonce);
  };

  return (
    <Layout>
      {/* ... */}
      
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAnnonceSelect(item)}>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text fontWeight="bold" style={{ fontSize: 18 }}>
                  {item.title}
                </Text>
                <Text>Type de bien: {item.typeDeBien}</Text>
                <Text>Surface: {item.surface} m²</Text>
                <Text>Prix: ${item.prix}</Text>
                <Text>Description: {item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Layout>
  );
}