import { getAllData, createNewData } from "@/services/servicesOperations";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const todos = await getAllData();
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "POST":
      try {
        const { title, isCompleted } = req.body;
        const newTodo = await createNewData({ title, isCompleted });
        res.status(201).json(newTodo);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
