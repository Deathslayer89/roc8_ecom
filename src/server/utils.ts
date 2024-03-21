import nodemailer from 'nodemailer';

// import { login } from 'lib';

// export const loginUtil=async (email:string)=>{
//     await login(email)
// }

function generate8DigitRandomNumber() {
    const min = 10000000;
    const max = 99999999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum.toString();
}

export const generateOTP = async (email: string): Promise<string> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    // Assuming you have a function to generate an 8-digit random number
    const generated = generate8DigitRandomNumber();
    console.log('in otp generator');

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'OTP VERIFICATION',
      text: generated.toString(), // Convert the generated OTP to a string
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.accepted.length > 0) {
      console.log('Email sent successfully');
      return generated.toString(); // Return the generated OTP as a string
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      throw error;
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred');
    }
  }
};



