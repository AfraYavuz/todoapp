import prisma from "@/lib/prisma/index";

// GET ALL
export async function getAllData(todo) {
  try {
    const data = await prisma[todo].findMany();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// POST
export async function createNewData(todo, newData) {
  try {
    const data = await prisma[todo].create({ data: newData });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// UPDATE
export async function updateDataByAny(todo, where, newData) {
  try {
    const data = await prisma[todo].update({
      where: where,
      data: newData,
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// DELETE
export async function deleteDataByAny(todo, where) {
  try {
    const data = await prisma[todo].delete({ where: where });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export default {
  getAllData,
  createNewData,
  updateDataByAny,
  deleteDataByAny,
};
