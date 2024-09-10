import { createNewData } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const body = req.body;
      if (!body) {
        throw new Error("Request body is missing");
      }

      const data = await createNewData("Todo", body);

      if (!data || data.error) {
        throw new Error(data.error);
      }
      return res
        .status(200)
        .json({ status: "success", message: "Todo created successfully" });
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
