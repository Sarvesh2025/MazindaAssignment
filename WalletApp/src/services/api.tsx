import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.29.23:3002' });

export const loginUser = async (email: string, password: string) => {
  const res = await API.post('/login', { email, password });
  return res;
}
export const getWalletId = async ()=> {
  const res = await API.get("/getWallets");
  return res;
}



export const addTransactions= async (amount: any,type:any, category: any) => {
  const walletId = getWalletId();
  const res = await API.post('/', {walletId,amount,type,category });
  return res;
}


  export const transactions = async () => {
    const walletId = getWalletId();
    console.log(walletId);
  const res = await API.get("/transactionhistory", {
    params: { walletId }, 
  });
  return res;
}
 
export default API;
