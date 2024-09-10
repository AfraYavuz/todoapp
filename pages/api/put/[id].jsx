import { updateData } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const body = req.body;

      if (!id || !body) {
        throw new Error("Request ID or body is missing");
      }

      const data = await updateData("Todo", id, body);

      if (!data || data.error) {
        throw new Error(data.error);
      }

      return res.status(200).json({
        status: "success",
        message: "Todo updated successfully",
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
