// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice"; // Import your Redux actions
const HomePage = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected sizes for each shoe
  const apiBaseUrl = "http://192.168.1.2:3000";
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    fetch(`${apiBaseUrl}/shoes`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShoes(data.shoes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  
  }, []);
  

  const dispatch = useDispatch();
  // const shoes = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (item, size) => {
    // Create an object that includes the item and the selected size
    const itemWithSize = {
      ...item,
      size,
    };

    // Dispatch the addToCart action with the item and size
    dispatch(addToCart(itemWithSize));
  };

  const toggleSizeSelection = (shoeId, size) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [shoeId]: prevSelectedSizes[shoeId]
        ? [...prevSelectedSizes[shoeId], size]
        : [size],
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.shoeItem}>
      <Image source={{ uri: item.image }} style={styles.shoeImage} />
      <Text style={styles.shoeName}>{item.name}</Text>
      <Text style={styles.shoeDescription}>{item.description}</Text>
      <Text style={styles.sizesAvailable}>
        Sizes Available: {item.sizesAvailable.join(", ")}
      </Text>
      <View style={styles.sizeSelector}>
        {item.sizesAvailable.map((size) => {
            const isSelected = selectedSizes[item._id]?.includes(size);
            const isItemInCart = cartItems.some((cartItem) => cartItem._id === item._id);
          return (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              {
                backgroundColor: isSelected && isItemInCart ? "green" : "gray",
              },
            ]}
            onPress={() => toggleSizeSelection(item._id, size)}
          >
            <Text style={styles.sizeButtonText}>{size}</Text>
          </TouchableOpacity>
        )})}
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item, selectedSizes[item._id])}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shoe Store</Text>
      <FlatList
        data={shoes}
        keyExtractor={(item) => item._id} // Replace with your unique identifier for shoes
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addToCartButton: {
    backgroundColor: "#b872ed", // Customize the button's background color
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 14,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#b872ed", // Background color for the container
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  shoeItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    backgroundColor: "white", // Background color for the shoe item
  },
  shoeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  shoeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  shoeDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  sizesAvailable: {
    fontSize: 14,
    marginBottom: 5,
  },
  sizeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeButton: {
    backgroundColor: "gray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5, // Rounded corners for the buttons
    margin: 5,
  },
  sizeButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default HomePage;
