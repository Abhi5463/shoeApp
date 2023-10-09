import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("consumer"); // Add a 'role' state
  const [showRoles, setShowRoles] = useState(false);

  const roles = [
    { label: "Consumer", value: "consumer" },
    { label: "Admin", value: "admin" },
  ];
  const apiBaseUrl = "http://192.168.1.2:3000";
  const handleRegister = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Send a POST request to your backend for user registration
    // Replace 'YOUR_API_ENDPOINT/register' with your actual API endpoint
    fetch(`${apiBaseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }), // Include 'role' in the request body
    })
      .then((response) => {
        console.log("Response status:", response.status); // Debug: Log the response status
        return response.json();
      })
      .then((response) => {
        console.log(response, "from register.js");
        if (response.success || response._id) {
          navigation.navigate("Login");
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleLoginLink = () => {
    // Navigate to the LoginScreen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
        {/* Role selection */}
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => setShowRoles(true)}
        >
          <Text style={styles.roleButtonText}>{role}</Text>
        </TouchableOpacity>
        {/* Role dropdown */}
        <Modal
          visible={showRoles}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowRoles(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={roles}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setRole(item.value);
                      setShowRoles(false);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginLink}>
          <Text style={styles.loginLink}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  roleButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#36D1DC", // Background gradient color
  },
  content: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#5B86E5",
    height: 50,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    color: "#5B86E5",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Register;
