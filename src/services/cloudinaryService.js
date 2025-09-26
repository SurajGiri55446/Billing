// src/services/cloudinaryService.js
import axios from "axios";

export const uploadInvoiceThumbnail = async (imageDataUrl) => {
  try {
   
    const base64Image = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");

    const formData = new FormData();
    formData.append("file", `data:image/png;base64,${base64Image}`);
    formData.append("upload_preset", "invoice_thumbnail"); 
   

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dstxwhhbj/image/upload",
      formData
    );

    if (response.status === 200) {
      console.log("✅ Cloudinary Upload Success:", response.data.secure_url);
      return response.data.secure_url;
    } else {
      throw new Error("Cloudinary upload failed");
    }
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.response?.data || error.message);
    throw error;
  }
};
