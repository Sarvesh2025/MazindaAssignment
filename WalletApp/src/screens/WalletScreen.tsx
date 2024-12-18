import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const WalletScreen = ({ navigation }: { navigation: any }) => {
  const wallet = useSelector((state: RootState) => state.wallet);
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Wallet Balance: ₹{wallet.balance}</Text>
      <Button title="Add Transaction" onPress={() => navigation.navigate('AddTransaction')} />
      <FlatList
        data={wallet.transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.type} - ₹{item.amount} ({item.category})</Text>
          </View>
        )}
      />

         
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  balance: { fontSize: 24, marginBottom: 20 },
  transactionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});

export default WalletScreen;
