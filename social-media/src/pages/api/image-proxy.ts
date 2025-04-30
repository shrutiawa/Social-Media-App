import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageUrl = req.query.url as string;

  if (!imageUrl) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.status(200).send(response.data);
  } catch (error: any) {
    console.error("Image proxy failed:", error.message);
    res.status(500).send("Image proxy error");
  }
}
