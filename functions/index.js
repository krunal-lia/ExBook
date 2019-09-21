const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'exbookad@gmail.com',
        pass: 'exbookrocks'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        
        const email = req.query.email;
        const contactName = req.query.name;
        const contactEmail = req.query.contactEmail;
        const contactPhoneNumber = req.query.phone;
        // const type = req.query.myType;

        // let message = "Below are the details of the seller, Please contact to eachother for transaction";
        // if(type === "sell") {
            // message = "Hey! A user is interested in buying your book on ExBook!! Below are the contact details!";
        // }
        const message = req.query.message;
        const mailOptions = {
            from: 'Ex Book <exbookad@gmail.com>', 
            to: email,
            subject: 'ExBook Notification',
            html: `<p style="font-size: 16px;">Dear Customer,</p>
                <br />
                <p style="font-size: 14px;">${message}</p>
                <p style="font-size: 14px;">Name: ${contactName}</p>          
                <p style="font-size: 14px;">Email: ${contactEmail}</p>          
                <p style="font-size: 14px;">PhoneNumber: ${contactPhoneNumber}</p>
                
                <br /> <p style="font-size: 16px;">Thanks & Regards,</p>
                <p style="font-size: 16px;">ExBook Team</p>          
                `
        };
  
        
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});
