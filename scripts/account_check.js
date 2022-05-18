
async function main() {
    const accounts = await hre.ethers.getSigners();


    console.log(accounts[1].address);

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
