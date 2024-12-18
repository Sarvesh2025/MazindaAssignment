import prisma from "../lib/db.js";

export const getWallets = async (req, res) => {
  const userId = req.user.id;

  try {
    const wallets = await prisma.wallet.findOne({
      where: { userId },
    });

    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user wallets" });
  }
};

export const getWalletsByUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId },
    });

    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user wallets" });
  }
};

export const createWallet = async (req, res) => {
  const userId = req.user.id;
  const { balance, isFreezed } = req.body;

  try {
    const wallet = await prisma.wallet.create({
      data: { userId, balance, isFreezed: isFreezed || false },
    });
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: "Error creating wallet" });
  }
};

export const updateWallet = async (req, res) => {
  const { id } = req.params;
  const { balance, isFreezed } = req.body;

  try {
    const updatedWallet = await prisma.wallet.update({
      where: { id },
      data: { balance, isFreezed },
    });
    res.json(updatedWallet);
  } catch (error) {
    res.status(500).json({ error: "Error updating wallet" });
  }
};

export const deleteWallet = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.wallet.delete({
      where: { id },
    });
    res.json({ message: "Wallet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting wallet" });
  }
};
