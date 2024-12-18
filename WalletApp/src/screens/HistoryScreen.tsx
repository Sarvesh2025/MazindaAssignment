import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const TransactionHistoryScreen = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // For selecting category to filter
  const [sortedTransactions, setSortedTransactions] = useState<any[]>([]); // To store sorted transactions
  const transactions = useSelector((state: any) => state.wallet.transactions);

  const categories = ['Food', 'Salary', 'Rent', 'Travel', 'Shopping', 'EMI', 'Saving']; // Categories to sort/filter

  useEffect(() => {
    setLoading(false);
    if (selectedCategory) {
      // Filter transactions by selected category
      const filteredTransactions = transactions.filter((txn: any) => txn.category === selectedCategory);
      setSortedTransactions(filteredTransactions);
    } else {
      // If no category is selected, show all transactions
      setSortedTransactions(transactions);
    }
  }, [selectedCategory, transactions]);

  const renderTransaction = ({ item }: { item: any }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.type}>{item.type}</Text>
      <Text>Amount: ₹{item.amount}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>

      <Text style={styles.label}>Filter by Category</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}
        style={styles.picker}>
        <Picker.Item label="All Categories" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sortedTransactions && sortedTransactions.length > 0 ? (
        <FlatList
          data={sortedTransactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
        />
      ) : (
        <Text style={styles.noData}>No Transactions Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  picker: { height: 50, width: '100%', marginBottom: 20 },
  transactionCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  type: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  noData: { textAlign: 'center', marginTop: 20, fontSize: 18, color: '#777' },
});

export default TransactionHistoryScreen;
