// @ts-nocheck
// @ts-ignore
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const ShoeUpload = () => {
  const [shoeName, setShoeName] = useState("");
  const [sizesAvailable, setSizesAvailable] = useState([]); // Sizes are stored as an array
  const [description, setDescription] = useState("");
  const [shoeImage, setShoeImage] = useState("");
  const [currentSize, setCurrentSize] = useState(""); // For adding sizes
  const apiBaseUrl = 'http://192.168.1.2:3000'
  
  const handleAddSize = () => {
    if (currentSize) {
      // @ts-ignore
      setSizesAvailable([...sizesAvailable, currentSize]);
      setCurrentSize("");
    }
  };

  const handleUpload = async () => {
    try {
      const shoeData = {
        shoeName,
        sizesAvailable,
        description,
        shoeImage,
      };
      const response = await fetch(`${apiBaseUrl}/shoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shoeData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Shoe details uploaded successfully:", responseData);
        setShoeName("");
        setSizesAvailable([]);
        setDescription("");
        setShoeImage("");
        setCurrentSize("");
      } else {
        console.error("Shoe upload failed:", responseData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Upload New Shoe</Text>
        <TextInput
          style={styles.input}
          placeholder="Shoe Name"
          onChangeText={(text) => setShoeName(text)}
          value={shoeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          onChangeText={(text) => setShoeImage(text)}
          value={shoeImage}
        />
        <View style={styles.sizeInputContainer}>
          <TextInput
            style={styles.sizeInput}
            placeholder="Size"
            onChangeText={(text) => setCurrentSize(text)}
            value={currentSize}
          />
          <Button title="Add Size" onPress={handleAddSize} />
        </View>
        <View style={{flexDirection: "row", justifyContent:"space-evenly"}}>
          {sizesAvailable.map((size, index) => (
            <Text key={index} style={styles.size}>
              {size}
            </Text>
          ))}
        </View>
       {shoeImage ? <Image source={{ uri: shoeImage }} style={styles.image} /> : <Text>Enter image URL to preview</Text>}
        <Button
          title="Upload Shoe"
          onPress={handleUpload}
          style={styles.uploadButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "95%", // Adjusted container width
    borderWidth: 2,
   borderColor: "teal"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%", // Input fields take full width
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sizeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sizeInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    paddingHorizontal: 10,
  },
  size: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  uploadButton: {
    borderRadius: 8, // Rounded border for the button
  },
});

export default ShoeUpload;
