const hre = require("hardhat");

async function main() {
    //get accounts list
    const signers = await hre.ethers.getSigners();
    // //deploy
    const Main = await hre.ethers.getContractFactory("Main");
    const main = await Main.deploy();

    console.log("main address: ", await main.address);

    for(let i = 0 ; i< 10; i++) {
        let tx1 = await main.connect(signers[0]).createNewSession(`Lorem Ipsum ${i}`, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", [`${i}`]);
        await tx1.wait();
        let tx2 = await main.connect(signers[`${i}`]).register(`Duong ${i}`, `Duong${i}@gmail.com`);
        await tx2.wait();
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });