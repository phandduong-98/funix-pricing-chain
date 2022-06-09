const { Signer } = require("ethers");
const hre = require("hardhat");
const images = ["QmdzpEH65BAnv9zHXSAVJKVWPteMTQ4mmPTh4ebALPSwCA", "QmXD6PXYTaaoqJcM6a5X6Vr9rTbkutXM1AXUJeb9pJQ7Nn", "QmaVouqN8E8aBgN76rk5oTGm9yJv3eNxGRJRbYZkexxDVW", "QmbfNeBroCjbiP5pz8QZhRPNbJxGZfZkfwf8NFQEMBdwkk", "QmPVN5qDBAzYFaFGTt4kqRyTHXXevgYqKLNKNctBihLkp3", "QmTZriAs1cVNGLgmmuneTjMHjtV2AG8JjBNZjWT1dLcdm6", "QmZR31zBuYQ8zfZXc4g3ZCeszmnUD118h6dcvVQjt9eapX", "QmVCp2ZXsLcEzUJC59XdfZkNdh452JSWCuYBhPH69aDWPx", "QmdzpEH65BAnv9zHXSAVJKVWPteMTQ4mmPTh4ebALPSwCA"]

async function main() {
    //get accounts list
    const signers = await hre.ethers.getSigners();
    // //deploy
    const Main = await hre.ethers.getContractFactory("Main");
    const main = await Main.deploy();
    const genRandomImages = () => {
        let randomImages = [];
        for(let i=0;i<3;i++){
            let randomIndex = Math.floor(Math.random() * images.length);
            randomImages.push(images[randomIndex]);
        }
        return randomImages
    }
    console.log("main address: ", await main.address);
    for(let i = 0 ; i< 10; i++) {
        let imagesArray = genRandomImages();
        let tx1 = await main.connect(signers[0]).createNewSession(`Lorem Ipsum ${i}`, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", imagesArray);
        await tx1.wait();
        let tx2 = await main.connect(signers[i]).register(`${signers[i].address}`, `${signers[i].address}@gmail.com`);
        await tx2.wait();
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });