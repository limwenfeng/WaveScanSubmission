import axios from "axios";

export const submitForm = async (formData) => {
  try {
    const response = await axios.post(
      `https://wavescan-internship.saurabhmudgal.repl.co/submitForm`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getScanners = async () => {
  try {
    const response = await axios.get(
      `https://wavescan-internship.saurabhmudgal.repl.co/success`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
