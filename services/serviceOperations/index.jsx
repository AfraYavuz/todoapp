import { prisma } from "@/utils/prisma"; // Named import

// GET ALL
export async function getAllData() {
  try {
    const data = await prisma.todo.findMany();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// POST
export async function createNewData(newData) {
  try {
    const data = await prisma.todo.create({
      data: newData,
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// UPDATE
export async function updateDataByAny(id, newData) {
  try {
    const data = await prisma.todo.update({
      where: { id },
      data: newData,
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// DELETE
export async function deleteDataByAny(id) {
  try {
    const data = await prisma.todo.delete({
      where: { id },
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export default { getAllData, createNewData, updateDataByAny, deleteDataByAny };
