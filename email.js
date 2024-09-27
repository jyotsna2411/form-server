const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//   "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"
// );

const createmsg = (data) => {
  return {
    to: "jyotsnasehgal24@gmail.com", // Change to your recipient
    from: "jyotsnasehgal24@gmail.com", // Change to your verified sender
    subject: "Form Submitted Successfully",
    text: `US Land Funders
Do you have a signed purchase agreement? : Yes
First Name: Charlie 
Last Name: Steele
Email:closing@cashlandbuyerusa.com
Phone:302-214-5514
Additional partner emails:claude@boirongroup.ca
Property State: ${data.State}
Property County:${data.County}
Property Address (If Available): ${data.address}
APN: ${data.APN}
Lot Size (in Acres):${data.LotSize}
Purchase Price:${data.ContractPrice}
Predicted Sales Price: ${data.SalePrice}
Closing Date:${data.ClosingDate}
If you've talked to a Real Estate Agent…
Recently Sold Comps:${data.SoldComps}
For Sale comps:${data.SaleComps}
Any other thoughts or issues?:${data.AdditionalInfo} `,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
};
const sendEmail = async (data) => {
  msg = createmsg(data);
  console.log("Message Sent");
  //   sgMail
  //     .send(msg)
  //     .then(() => {
  //       console.log("Email sent");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
};

module.exports = sendEmail;
