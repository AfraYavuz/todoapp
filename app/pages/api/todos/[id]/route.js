import {
  updateDataByAny,
  deleteDataByAny,
} from "@/services/servicesOperations";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      try {
        const newData = req.body;
        const updatedTodo = await updateDataByAny(id, newData);
        res.status(200).json(updatedTodo);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedTodo = await deleteDataByAny(id);
        res.status(200).json(deletedTodo);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
