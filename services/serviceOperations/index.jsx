import prisma from "@/lib/prisma/index";

// GET ALL
export async function getAllData(tableName) {
  try {
    const data = await prisma[tableName].findMany();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// POST
export async function createNewData(tableName, newData) {
  try {
    const data = await prisma[tableName].create({ data: newData });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// PUT (UPDATE)
export async function updateData(tableName, id, newData) {
  try {
    const data = await prisma[tableName].update({
      where: { id: id },
      data: newData,
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// DELETE
export async function deleteData(tableName, id) {
  try {
    const data = await prisma[tableName].delete({
      where: { id: id },
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export default {
  getAllData,
  createNewData,
  updateData,
  deleteData,
};
