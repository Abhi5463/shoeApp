import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiBaseUrl = 'http://192.168.1.2:3000'
  const handleLogin = () => {
    fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const userRole = data.user.role;
          console.log(userRole, "User role");
          if (userRole === 'admin') {
            navigation.navigate('ShoeUpload'); 
          } else if (userRole === 'consumer') {
            navigation.navigate('Home');
          } else {
            // console.log(userRole);
            alert('Unknown role. Please contact support.');
          }
        } else {
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const handleRegisterLink = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterLink}>
          <Text style={styles.registerLink}>Don't have an account? Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36D1DC',
  },
  content: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#5B86E5',
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    color: '#5B86E5',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Login;
