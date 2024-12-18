import prismaClient from "../lib/db.js";

export const getUsers = async (_req, res) => {
  const users = await prismaClient.user.findMany({
    select: {
      password: 0,
    },
  });

  return res.status(200).json({ users });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
      select: {
        password: 0,
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: { username, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

export const toggleActivateStatus = async (req, res) => {
  const { id } = req.params;
  const user = await prismaClient.user.findUnique({ where: { id } });

  if (!user) return res.status(404).json({ error: "User not found" });

  const updated = await prismaClient.user.update({
    where: { id },
    data: {
      isActivated: !user.isActivated,
    },
  });

  if (!updated) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  return res.status(200).json({
    isActivated: updated.isActivated,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prismaClient.user.delete({
      where: { id },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
