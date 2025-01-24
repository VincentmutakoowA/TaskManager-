import nodemailer from "nodemailer"

//GETTING RESET TOKEN
export async function generateResetToken(email) {
    return 4;
}

//SENDING MAIL
export async function sendResetEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vincentmutakoowa@gmail.com',
            pass: 'fdna hlsc ocvt zclr'
        }
    });
    const mailOptions = {
        from: 'vincimuta@gmail.com',
        to: 'mvincimvinci@gmail.com',
        subject: 'Nodemailer Test',
        text: 'Hello from Nodemailer!'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
