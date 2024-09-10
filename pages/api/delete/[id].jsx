import { deleteData } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error("Request ID is missing");
      }

      const data = await deleteData("Todo", id);

      if (!data || data.error) {
        throw new Error(data.error);
      }

      return res.status(200).json({
        status: "success",
        message: "Todo deleted successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  } else {
    return res
      .status(500)
      .json({ status: "error", error: "Unsupported request method" });
  }
};

export default handler;
