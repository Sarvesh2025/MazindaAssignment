import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/walletSlice';
import { TextInput } from 'react-native-gesture-handler';
import { addTransactions } from '../services/api';

const AddTransactionScreen = ({ navigation }: { navigation: any }) => {
  const [type, setType] = useState<'Debit' | 'Credit'>('Debit');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Saving'); 
  const dispatch = useDispatch();

  const categories = ['Saving', 'EMI', 'Food', 'Rent', 'Shopping', 'Travel']; 

  const handleAddTransaction = () => {
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }

    addTransactions(amount, type, category);
    const newTransaction = {
      id: new Date().toISOString(),
      type,
      amount: parsedAmount,
      category,
      date: new Date().toLocaleDateString(),
    };

    
    dispatch(addTransaction(newTransaction));

    Alert.alert('Success', 'Transaction added successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

     
      <Text style={styles.label}>Transaction Type</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue as 'Debit' | 'Credit')}
        style={styles.picker}>
        <Picker.Item label="Debit" value="Debit" />
        <Picker.Item label="Credit" value="Credit" />
      </Picker>

   
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}>
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

    
      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  picker: { height: 50, width: '100%', marginBottom: 20 },
});

export default AddTransactionScreen;
