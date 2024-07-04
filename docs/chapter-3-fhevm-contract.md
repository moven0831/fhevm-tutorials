# Developing Confidential Smart Contracts

It's time to build your own smart contract on top of fhEVM. Let's get started!

This guide is based on the [zama-ai/fhevm-hardhat-template](https://github.com/zama-ai/fhevm-hardhat-template). For more in-depth information, refer to the source.

## What You Will Achieve
✅ Quickly spin up a self-sufficient Docker image of fhEVM. \
✅ Develop your own confidential smart contract. \
✅ Use Hardhat to compile, deploy, test, and interact with the contract.

## Prepare Dependencies

Ensure the following dependencies are installed:

- [Docker](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/installation)
- Node.js (v20)

Create a `.env` file in the root directory with a BIP-39 compatible mnemonic. Use the [mnemonic code converter](https://iancoleman.io/bip39/) to generate one if needed.

Install dependencies:

```sh
# In the root of fhevm-hardhat-template
pnpm install
```

## Spin Up Local fhEVM on Docker

Start a local fhEVM Docker container, which includes everything needed to deploy FHE encrypted smart contracts:

```sh
# In one terminal, keep it open to see node logs
pnpm fhevm:start
```

Wait 2-3 minutes for the initial setup. After seeing blockchain logs, run tests to check contract availability:

```sh
pnpm test
```

To stop the container and clean the state:

```sh
pnpm fhevm:stop
```

## Develop Smart Contract

We will use the `EncryptedERC20.sol` contract as an example.

### Compile

Compile the existing smart contracts with Hardhat:

```sh
pnpm compile
```

### Deploy

Deploy the `EncryptedERC20` contract to the local network by modifying the deployment arguments:

```ts
// fhevm-hardhat-template/tasks/deployERC20.ts

import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:deployERC20").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers = await ethers.getSigners();
  const erc20Factory = await ethers.getContractFactory("EncryptedERC20");
  const encryptedERC20 = await erc20Factory.connect(signers[0]).deploy("NSLab Tutorial", "NSLT");   // Since it's initially for NSLab project
  await encryptedERC20.waitForDeployment();
  console.log("EncryptedERC20 deployed to: ", await encryptedERC20.getAddress());
});
```

Run the deployment script:

```sh
pnpm task:deployERC20
```

### Interact

Write a script to interact with the deployed `EncryptedERC20` contract:

```ts
// fhevm-hardhat-template/tasks/mintERC20.ts

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
```

Import the task in `hardhat.config.ts`:

```ts
// fhevm-hardhat-template/hardhat.config.ts

import "./tasks/mintERC20";
```

Add the script to `package.json`:

```json
// fhevm-hardhat-template/package.json
{
    ...
    "scripts": {
        ...
        "task:mintERC20": "hardhat task:mintERC20",
        ...
    }
}
```

Run the script to interact with the contract:

```sh
pnpm task:mintERC20
```

By running the interaction script multiple times, you will see the total supply of the token increase, indicating successful interactions.

## Add Your Own Contract

To add your own contract:

1. Create a new Solidity file in the `contracts` directory.
2. Update the deployment script in the `deploy` or `tasks` directory.
3. Add the script to `hardhat.config.ts` and `package.json`.
4. Compile, deploy, and test your contract as demonstrated.
5. Enjoy the magic of FHE + smart contract.

Congrats! Now you've learned how to manipulate the fhEVM and confidential smart contract. It's time to explore more on the potential of applications built on top of fhEVM. Good luck!

## Reference

- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [fhEVM Documentation](https://docs.zama.ai/fhevm/)
- [TypeChain Documentation](https://github.com/dethcrypto/TypeChain)
- [Solhint Documentation](https://protofire.github.io/solhint/)

For more details, refer to the [zama-ai/fhevm-hardhat-template](https://github.com/zama-ai/fhevm-hardhat-template) repository.
