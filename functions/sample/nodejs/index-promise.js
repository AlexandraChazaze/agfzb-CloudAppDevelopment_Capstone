/**
 * Get all dealerships
 */

 const { CloudantV1 } = require('@ibm-cloud/cloudant');
 const { IamAuthenticator } = require('ibm-cloud-sdk-core');
 
 function main(params) {
 
     const authenticator = new IamAuthenticator({ apikey: "QbiL-TjuXWbyQW4ZVaGAUHiCvbs42bKYjNe_arv7Ops3" })
     const cloudant = CloudantV1.newInstance({
       authenticator: authenticator
     });
     cloudant.setServiceUrl("https://2da71344-950e-4896-bfa1-82f66b8f0b5e-bluemix.cloudantnosqldb.appdomain.cloud/");
 
     let dbListPromise = getDbs(cloudant);
     return dbListPromise;
 }
 
 function getDbs(cloudant) {
      return new Promise((resolve, reject) => {
          cloudant.getAllDbs()
              .then(body => {
                  resolve({ dbs: body.result });
              })
              .catch(err => {
                   console.log(err);
                  reject({ err: err });
              });
      });
  }
  
  
  /*
  Sample implementation to get the records in a db based on a selector. If selector is empty, it returns all records. 
  eg: selector = {state:"Texas"} - Will return all records which has value 'Texas' in the column 'State'
  */
  function getMatchingRecords(cloudant,dbname, selector) {
      return new Promise((resolve, reject) => {
          cloudant.postFind({db:dbname,selector:selector})
                  .then((result)=>{
                    resolve({result:result.result.docs});
                  })
                  .catch(err => {
                     console.log(err);
                      reject({ err: err });
                  });
           })
  }
  
                         
  /*
  Sample implementation to get all the records in a db.
  */
  function getAllRecords(cloudant,dbname) {
      return new Promise((resolve, reject) => {
          cloudant.postAllDocs({ db: dbname, includeDocs: true, limit: 10 })            
              .then((result)=>{
                resolve({result:result.result.rows});
              })
              .catch(err => {
                 console.log(err);
                 reject({ err: err });
              });
          })
  }
