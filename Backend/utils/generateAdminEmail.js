export const generateAdminEmail = (orders, user = {}) => {
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return `<p>No valid order details found.</p>`;
  }

  return `
  <div style="font-family: Poppins, Arial, sans-serif; max-width: 650px; background-color: #ffffff; margin:0 auto; border-radius: 10px; padding: 20px; border:1px solid #eee;">
    
    <div style="text-align:center;">
     <img src="https://res.cloudinary.com/diz0v7rws/image/upload/v1757410386/hope-hospital/gallery/WhatsApp_Image_2025-09-09_at_3.01.08_PM.jpg" style="width: 13rem; display: block;" />
    </div>
    
    <h2 style="color:#d93025; font-size:20px; font-weight:600; margin:0 0 10px;">
      New Order Received - Shanya Scans & Theranostics
    </h2>
    
    <p style="font-size:15px; color:#333;">
      A new order has been placed by <b>${user.fullName || "N/A"}</b>. Below are the details:
    </p>

    <table style="width:100%; border-collapse: collapse; font-size:14px; margin:15px 0;">
      <thead>
        <tr style="background:#ffe7e7; color:#d93025;">
          <th style="padding:8px; border:1px solid #ddd;">Patient</th>
          <th style="padding:8px; border:1px solid #ddd;">Age/Gender</th>
          <th style="padding:8px; border:1px solid #ddd;">Test</th>
          <th style="padding:8px; border:1px solid #ddd;">Date</th>
          <th style="padding:8px; border:1px solid #ddd;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(order =>
          order.orderDetails?.map(patient =>
            patient.tests?.map(test => `
              <tr>
                <td style="padding:8px; border:1px solid #ddd;">${patient.patientName || "N/A"}</td>
                <td style="padding:8px; border:1px solid #ddd;">${patient.patientAge || "N/A"} / ${patient.patientGender || "N/A"}</td>
                <td style="padding:8px; border:1px solid #ddd;">${test.orderName || "N/A"}</td>
                <td style="padding:8px; border:1px solid #ddd;">${test.bookingDate || "N/A"} ${test.bookingTime || ""}</td>
                <td style="padding:8px; border:1px solid #ddd;">₹${test.orderPrice || 0}</td>
              </tr>
            `).join("")
          ).join("")
        ).join("")}
      </tbody>
    </table>

    <div style="background:#f8f8f8; padding:10px; border-radius:6px; margin:15px 0;">
      <p style="margin:0; font-size:14px; color:#444;">
        <b>User Details:</b><br/>
        Name: ${user.fullName || "N/A"}<br/>
        Phone: ${user.phoneNumber || "N/A"} ${user.altPhoneNumber ? " | " + user.altPhoneNumber : ""}<br/>
        Email: ${user.email || "N/A"}<br/>
        Address: ${user.address || "N/A"}<br/>
        Pincode: ${user.pinCode || "N/A"}<br/>
        Location: ${user.selectedPlace || "N/A"}
      </p>
    </div>

    <p style="font-size:14px; color:#333;">
      Please assign this order to the respective department immediately.
    </p>

    <p style="font-size:13px; color:#666; margin-top:20px;">
      <b>Regards</b>,<br/>
      Booking System - Shanya Scans & Theranostics<br/>
      <b>Toll-Free No:</b> 1800 123 4187<br/>
      <a href="https://www.shanyascans.com" style="color:#1877f2; text-decoration:none;">www.shanyascans.com</a>
    </p>
  </div>
  `;
};
