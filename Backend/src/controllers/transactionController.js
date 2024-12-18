import prisma from "../lib/db.js";

export const createTransaction = async (req, res) => {
  try {
    const { id } = req.user;
    const { walletId, amount, type, category } = req.body;
    if (amount <= 0) {
      return res
        .status(400)
        .json({ error: "Amount should be positive non-zero." });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    
    if (!user) return res.status(404).json({ error: "User not found." });

    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    if (type === "debit" && wallet.balance < amount) {
      return res
        .status(400)
        .json({ error: "This wallet doesn't have sufficient funds" });
    }

    const txn = await prisma.transaction.create({
      data: {
        type,
        amount,
        category,
        walletId,
      },
    });

    if (!txn)
      return res
        .status(400)
        .json({ error: "Transaction failed, please try again." });

    const updated = await prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance:
          type === "credit" ? wallet.balance + amount : wallet.balance - amount,
      },
    });

    if (!updated)
      return res
        .status(400)
        .json({ error: "Transaction failed, please try again" });

    return res.status(200).json({ message: "Transaction was successfull" ,data:txn});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
export const getTransactionHistory = async (req, res) => {
  try {
    const { id } = req.user; 
    const { walletId } = req.query; 
    console.log(walletId);

    
    if (!walletId) {
      return res.status(400).json({ error: "Wallet ID is required." });
    }

    // Fetch transactions for the given wallet
    const transactions = await prisma.transaction.findMany({
      where: {
        walletId: walletId, 
      }
    });

    // Check if no transactions exist
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found for this wallet." });
    }

    // Return fetched transactions
    return res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching transactions." });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params; 
    const { amount, type, category } = req.body;

    
    if (amount && amount <= 0) {
      return res.status(400).json({ error: "Amount must be positive non-zero." });
    }

  
    const transaction = await prisma.transaction.findUnique({ where: { id: parseInt(id) } });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    
    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        amount: amount || transaction.amount,
        type: type || transaction.type,
        category: category || transaction.category,
      },
    });

    return res.status(200).json({
      message: "Transaction updated successfully.",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return res.status(500).json({ error: "An error occurred while updating the transaction." });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params; 

    
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    
    const wallet = await prisma.wallet.findUnique({
      where: { id: transaction.walletId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    const newBalance =
      transaction.type === "credit"
        ? wallet.balance - transaction.amount
        : wallet.balance + transaction.amount;

    // Update the wallet balance
    await prisma.wallet.update({
      where: { id: transaction.walletId },
      data: { balance: newBalance },
    });

    // Delete the transaction
    await prisma.transaction.delete({ where: { id: parseInt(id) } });

    return res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({ error: "An error occurred while deleting the transaction." });
  }
};

