const nforce = require("nforce"),
  SALESFORCE_CONSUMER_KEY = process.env.SALESFORCE_CONSUMER_KEY,
  SALESFORCE_CONSUMER_SECRET = process.env.SALESFORCE_CONSUMER_SECRET,
  SALESFORCE_USERNAME = process.env.SALESFORCE_USERNAME,
  SALESFORCE_PASSWORD = process.env.SALESFORCE_PASSWORD;

const org = nforce.createConnection({
  clientId: SALESFORCE_CONSUMER_KEY,
  clientSecret: SALESFORCE_CONSUMER_SECRET,
  redirectUri: "http://localhost:3000/oauth/_callback",
  mode: "single",
    environment: "sandbox",  
  autoRefresh: true
});

login = () => {
  console.log("SALESFORCE_USERNAME = "+SALESFORCE_USERNAME);
  console.log("SALESFORCE_PASSWORD = "+SALESFORCE_PASSWORD);
  org.authenticate(
    
    { username: SALESFORCE_USERNAME, password: SALESFORCE_PASSWORD },
    err => {
      if (err) {
        console.error("Authentication error");
        console.error(err);
      } else {
        console.log("Authentication successful");
      }
    }
  );
};

exports.queryForBot = query => {
  return new Promise((resolve, reject) => {
    org.query({ query: query }, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp.records);
      }
    });
  });
};

exports.callApex = () =>{
   console.log("Inside call apex");
  return new Promise((resolve, reject) => {
    var body = {"hiee"};
    org.apex.post("/googleHackBot", body, function(err, resp) {
      console.log("Inside call apex" +res);
       if (err) {
        reject(err);
      } else {
        resolve(resp.records);
      }
      // the response object structure depends on the definition of apex class
    });
   
  });
};

login();
