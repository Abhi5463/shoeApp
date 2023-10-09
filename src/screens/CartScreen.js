// @ts-nocheck
// CartScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const removeItemFromCart = (itemId) => {
    // Dispatch the removeFromCart action with the item ID
    dispatch(removeFromCart(itemId));
  };

  const renderItem = ({ item }) => (
    <View style={styles?.cartItem}>
      <Image source={{ uri: item?.image }} style={styles?.itemImage} />
      <View style={styles?.itemDetails}>
        <Text style={styles?.itemName}>{item.name}</Text>
        <Text style={styles?.itemDescription}>{item.description}</Text>
        <Text style={styles?.itemSize}>Sizes: {item?.size.join(", ")}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItemFromCart(item._id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item._id}_${index}`} 
          renderItem={renderItem}
        />
      ) : (
        <Text>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#009688", // Teal background color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // White text color
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10, 
    borderRadius: 10,
    backgroundColor: "#fff", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Add shadow to the cart item
    marginBottom: 10, // Add margin to separate cart items
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemSize: {
    fontSize: 14,
    marginBottom: 5,
    backgroundColor: "#009688", 
    color: "#fff", // White text color for sizes
    paddingHorizontal: 8, // Add padding to sizes
    borderRadius: 5, // Add rounded border to sizes
    marginRight: 10, // Add margin to separate sizes
  },
  removeButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 14,
  },
});


export default CartScreen;
