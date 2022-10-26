const hre = require("hardhat");

async function main() {

    const signers = await hre.ethers.getSigners();
    const main = await hre.ethers.getContractAt("Main", "0x5FbDB2315678afecb367f032d93F642f64180aa3");


    // const session0Address = await main.sessions(0);
    let createSession1 = await main.connect(signers[0]).createNewSession(`Lorem Ipsum ${i}`, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", imagesArray);
    await tx1.wait(1);
    let register1 = await main.connect(signers[1]).register(`${signers[i].address}`, `${signers[i].address}@gmail.com`);
    await register1.wait();
    let register2 = await main.connect(signers[2]).register(`${signers[i].address}`, `${signers[i].address}@gmail.com`);
    await register2.wait();
    

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });