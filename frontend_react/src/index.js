import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/users"
    );

    console.log(response.data.data);

    return response.data.data;
  } catch (err) {
    console.error("Waduh, error nih:", err);
  }
};