// controllers/contactController.js
import ContactMessage from "../models/ContactMessage.js";

export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
