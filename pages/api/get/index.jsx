import { getAllData } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const todos = await getAllData("Todo");

      if (!todos || todos.error) {
        throw new Error(todos.error);
      }
      return res.status(200).json({ status: "success", data: todos });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", error: error.message, data: null });
    }
  } else {
    return res.status(500).json({
      status: "error",
      error: "Unsupported request method",
      data: null,
    });
  }
}
