# fhEVM tutorials - Develop your own confidential contracts

This guide is designed for first-time users looking to explore and develop their own smart contracts on fhEVM. If you're already familiar with the concepts of fhEVM, feel free to dive into this tutorial to quickly learn how to develop on the fhEVM codebase.

> [!TIP]
> We highly recommend switching to the [start-from-here](https://github.com/moven0831/fhevm-tutorials/tree/start-from-here) branch to enjoy a journey from scratch.

## Tutorial Goals

- **Understand FHE Integration**: Learn how to integrate Fully Homomorphic Encryption (FHE) functionalities into an EVM-compatible blockchain.
- **Explore Confidential Smart Contracts**: Discover how confidential smart contracts can perform computations on encrypted data.
- **Hands-on Development**: Gain practical experience in developing, deploying, and interacting with custom confidential smart contracts.

### Why This Tutorial?

While the official website offers numerous references, the content is often divided by functionalities (e.g., starting a local node and testing your own smart contract on fhEVM are separate). This could be overwhelming for beginners, leading to confusion and potentially giving up.

This tutorial aims to consolidate all the valuable resources provided by the Zama team, presenting them with a clear goal: writing, compiling, deploying, and interacting with your own confidential smart contract. So that it not only helps people understand the protocol concepts but also develop practical skills from scratch, reinforcing what they've learned from the documentation.

## Content

1. [**Understanding the concepts of fhEVM**](https://github.com/moven0831/fhevm-tutorials/blob/main/docs/chapter-1-concepts.md): 
    - **Overview**: Get a comprehensive understanding of the fhEVM protocol, its architecture, and key concepts.
   - **FHE and Blockchain**: Learn how FHE enhances privacy and security in blockchain applications.

2. [**Integrating FHE Functionalities**](https://github.com/moven0831/fhevm-tutorials/blob/main/docs/chapter-2-local-build.md): 
   - **Setup Environment**: Step-by-step instructions to set up your development environment.
   - **Upgrade EVM-compatible Blockchain**: Detailed guide on integrating FHE functionalities into an EVM-compatible blockchain.

3. [**Developing Confidential Smart Contracts**](https://github.com/moven0831/fhevm-tutorials/blob/main/docs/chapter-3-fhevm-contract.md): 
   - **Writing Contracts**: Learn how to write confidential smart contracts that can compute on encrypted data.
   - **Compilation and Deployment**: Step-by-step guide to compiling and deploying your contracts on fhEVM.
   - **Interacting with Contracts**: Instructions on how to interact with your deployed contracts, including reading and writing on-chain data.

## References

- [fhEVM](https://github.com/zama-ai/fhevm): The main repository for fhEVM, containing the core codebase and documentation.
- [fhEVM Whitepaper](https://github.com/zama-ai/fhevm/blob/main/fhevm-whitepaper.pdf): Detailed technical paper outlining the principles and technologies behind fhEVM.
- [fhEVM on Evmos](https://github.com/zama-ai/fhevm-evmos): Repository for the implementation of fhEVM on the Evmos blockchain.
- [fhEVM Go](https://github.com/zama-ai/fhevm-go): an open-source library used to easily integrate the fhEVM into an EVM-compatible blockchain.
- [fhEVM Hardhat Template](https://github.com/zama-ai/fhevm-hardhat-template): Template for developing confidential smart contracts using Hardhat.
