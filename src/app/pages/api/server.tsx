// pages/api/home.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("http://localhost:5000/api/home");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data from Flask server" });
  }
}
