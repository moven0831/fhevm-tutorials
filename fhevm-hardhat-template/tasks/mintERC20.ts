import { task } from "hardhat/config";

task("task:mintERC20").setAction(async function (taskArgs, hre) {
  // Get the ContractFactory of the EncryptedERC20 contract
  const encryptedERC20Contract = await hre.ethers.getContractFactory("EncryptedERC20");

  // Connect to the deployed EncryptedERC20 contract
  const encryptedERC20Address = "YOUR DEPLOYED CONTRACT ADDRESS HERE";
  const encryptedERC20 = encryptedERC20Contract.attach(encryptedERC20Address);

  // Get the name of the token
  const name = await encryptedERC20.name();
  console.log(`Token name: ${name}`);

  // Get the current total supply
  const totalSupplyBefore = await encryptedERC20.totalSupply();
  console.log(`Total supply before minting: ${totalSupplyBefore}`);

  // mint 1000 tokens to the deployer
  const tx = await encryptedERC20.mint(1000);
  console.log(`Minting 1,000 token. Transaction hash: ${tx.hash}`);
});
