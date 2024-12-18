import prisma from "../lib/db.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving categories" });
  }
};
