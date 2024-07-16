// Import the required modules
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;


app.use(
    cors({
      origin: "http://172.20.10.5:5173",
    })
  );
// Middleware to parse JSON bodies
app.use(express.json());
class BaseModel {
  constructor() {
      this.logs = [];
  }

  logActivity(activity) {
      const logEntry = `${new Date().toISOString()} - ${activity}`;
      this.logs.push(logEntry);
      console.log(logEntry);
  }
}

let validIPs = ["172.20.10.3","172.20.10.5"]
let malver = ["virus","hack","bug"]
let invalidIPs= []
class Firewall extends BaseModel {
  // constructor() {
    //     super(new Firewall());
    // }

  inspectMessage(ip,message) {
      let flag = 0
      validIPs.map((IP)=> {
        if(IP==ip){
          flag =1
          malver.map((msg)=>{
            if(message===msg){
              invalidIPs.push(ip)
              validIPs = validIPs.filter((IP)=> IP!=ip)
              flag=2;
            }
          })
        }
      })
      console.log(validIPs);
      return flag
  }


  // addBlockedIP(ip) {
  //     // const { ip } = req.body;
  //     this.model.addBlockedIP(ip);
  //     res.send({ status: 'Blocked IP added' });
  // }

  // removeBlockedIP(req, res) {
  //     const { ip } = req.body;
  //     this.model.removeBlockedIP(ip);
  //     res.send({ status: 'Blocked IP removed' });
  // }

  // addTrustedIP(req, res) {
  //     const { ip } = req.body;
  //     this.model.addTrustedIP(ip);
  //     res.send({ status: 'Trusted IP added' });
  // }

  // removeTrustedIP(req, res) {
  //     const { ip } = req.body;
  //     this.model.removeTrustedIP(ip);
  //     res.send({ status: 'Trusted IP removed' });
  // }
}



app.get('/hello', (req, res) => {
    const ipAddress = req.socket.remoteAddress;
    const {msg} = req.query
    console.log(msg);
  console.log(ipAddress);
  let fire = new Firewall()
  const flag = fire.inspectMessage(ipAddress,msg)
  let message
  if(flag ==1){
    message="It is a valid ip address"
  }
  else if(flag==2){
    message="message is not good"
  }
  else{
    message="It is not a valid ip address"
  }
  res.status(200).json({message})
});


// Start the server
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
