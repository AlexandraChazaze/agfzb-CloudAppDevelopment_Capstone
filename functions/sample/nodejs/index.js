/**
 * Get all databases
 */

 const { CloudantV1 } = require("@ibm-cloud/cloudant");
 const { IamAuthenticator } = require("ibm-cloud-sdk-core");
 
 function main(params) {
   const authenticator = new IamAuthenticator({ apikey: "QbiL-TjuXWbyQW4ZVaGAUHiCvbs42bKYjNe_arv7Ops3" });
   const cloudant = CloudantV1.newInstance({
     authenticator: authenticator,
   });
   cloudant.setServiceUrl("https://2da71344-950e-4896-bfa1-82f66b8f0b5e-bluemix.cloudantnosqldb.appdomain.cloud/");
 
   let dbList = getDbs(cloudant);
   return { dbs: dbList };
 }
 
 function getDbs(cloudant) {
   cloudant
     .getAllDbs()
     .then((body) => {
       body.forEach((db) => {
         dbList.push(db);
       });
     })
     .catch((err) => {
       console.log(err);
     });
 }
