/**
 * Get all dealerships
 */

 const { CloudantV1 } = require('@ibm-cloud/cloudant');
 const { IamAuthenticator } = require('ibm-cloud-sdk-core');
 
 async function main(params) {
       const authenticator = new IamAuthenticator({ apikey: "QbiL-TjuXWbyQW4ZVaGAUHiCvbs42bKYjNe_arv7Ops3" })
       const cloudant = CloudantV1.newInstance({
           authenticator: authenticator
       });
       cloudant.setServiceUrl("https://2da71344-950e-4896-bfa1-82f66b8f0b5e-bluemix.cloudantnosqldb.appdomain.cloud/");
       try {
         let dbList = await cloudant.getAllDbs();
         return { "dbs": dbList.result };
       } catch (error) {
           return { error: error.description };
       }
 }
 
