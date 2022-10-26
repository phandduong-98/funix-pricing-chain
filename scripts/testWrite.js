const fs = require("fs-extra");
const fileName = "../contractAddresses.json"
const contractAddresses = require(fileName)



async function main() {

    contractAddresses.MAIN_CONTRACT_ADDRESS = "aaaaaaaaddddddddddanew value";
    fs.writeJSON("contractAddresses.json", {"MAIN_CONTRACT_ADDRESS" : "zzzzzzzzszzzz"}, function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(contractAddresses));
      console.log('writing to ' + fileName);
    });
    
}

main();