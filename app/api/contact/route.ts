import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, location, email, message } = await req.json();

    // Validate the input
    if (!name || !phone || !location || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Form Data Received:", { name, phone, location, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // console.log("Transporter Created");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NEXT_PUBLIC_EMAIL_TO,
      subject: "Photography Services Inquiry",
      html: `
    <p>Dear Photography Services Team,</p>

    <p>You have received a new inquiry regarding your photography services. Here are the details:</p>

    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Location:</strong> ${location}</li>
      <li><strong>Email:</strong> ${email}</li>
    </ul>

    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>

    <p>Please respond to this inquiry as soon as possible.</p>

    <p>Sincerely,<br>The Automated Inquiry System</p>
  `,
    });

    // console.log("Mail Options:", mailOptions);

    // console.log("Email Sent Successfully");

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}