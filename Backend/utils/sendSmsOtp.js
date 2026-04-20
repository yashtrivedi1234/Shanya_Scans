import axios from "axios";

export const sendSmsOtp = async (phone, otp) => {
  const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

  const message = `Your Shanya Scans verification code is ${otp}. Do not share this OTP with anyone. Valid for 10 minutes. – Team Shanya Scans`;

  const payload = {
    api_id: process.env.SMS_API_ID,
    api_password: process.env.SMS_API_PASSWORD,
    sms_type: "Transactional",
    sms_encoding: "text",
    sender: process.env.SMS_SENDER,
    number: formattedPhone,
    message,
  };

  console.log("SMS PAYLOAD:", payload);

  const response = await axios.post(process.env.SMS_API_URL, payload);

  console.log("SMS API FULL RESPONSE:", JSON.stringify(response.data, null, 2));

  if (
    !response.data ||
    response.data.status === "failure" ||
    response.data.error
  ) {
    throw new Error("SMS Gateway Error: " + JSON.stringify(response.data));
  }

  return response.data;
};
