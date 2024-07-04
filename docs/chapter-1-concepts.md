# Understanding the concepts of fhEVM

Before diving into coding, let's go through the core concepts of the Fully Homomorphic Encryption Virtual Machine (fhEVM), which integrates FHE into the Ethereum blockchain, allowing computations on encrypted data without revealing the underlying data. This protocol enhances privacy and security for blockchain applications.

You can also check the slides of [the introduction to fhEVM](https://git.nslab.csie.ntu.edu.tw/moven2024/lab-presentation/-/blob/main/_NSlab_Crypto__fhEVM.pdf) (NTU IP required) and [the recording in Mandarin](https://drive.google.com/file/d/1ZUWCeqha-f2E_yRpneN2K0TO7e8HJLve/view).

## Table of Contents

- [Understanding fhEVM](#understanding-fhevm)
    - [The Need for Privacy in Blockchains](#the-need-for-privacy-in-blockchains)
    - [What is Fully Homomorphic Encryption (FHE)?](#what-is-fully-homomorphic-encryption-fhe)
- [Architecture of fhEVM](#architecture-of-fhevm)
    - [Global FHE Key](#global-fhe-key)
    - [Threshold Decryption Protocol](#threshold-decryption-protocol)
    - [Precompiled Contracts for FHE Operations](#precompiled-contracts-for-fhe-operations)
    - [Encrypted Data Types and Operations](#encrypted-data-types-and-operations)
    - [Privileged Memory and Storage](#privileged-memory-and-storage)
- [Applications of fhEVM](#applications-of-fhevm)
- [Resources](#resources)

## Understanding fhEVM

### The Need for Privacy in Blockchains

Blockchains require transparency for consensus, making all on-chain data publicly visible. This transparency presents significant privacy challenges, deterring the adoption of blockchains for sensitive applications. The fhEVM protocol addresses this challenge by enabling confidential smart contracts.

### What is Fully Homomorphic Encryption (FHE)?

FHE allows computations on encrypted data without decrypting it. This means data can remain confidential while still being processed. FHE is critical for privacy-preserving applications on blockchains, as it ensures that sensitive information is not exposed during computations.

## Architecture of fhEVM

### Global FHE Key

The global FHE key is a fundamental concept in fhEVM. It is an asymmetric encryption key shared across the entire blockchain network:

- **Public Key**: Used for encrypting data, stored on-chain, and accessible to all participants.
- **Private Key**: Secret-shared among validators using threshold protocols to ensure no single party can decrypt data independently.

**Why a Global FHE Key?**

- **Mixing Encrypted Data**: Allows seamless mixing of encrypted data from different users and smart contracts.
- **Consistency**: Ensures consistency in encryption and decryption processes across the network.
- **Security**: By using threshold protocols, the private key remains secure, preventing unauthorized decryption.

### Threshold Decryption Protocol

The threshold decryption protocol is used to decrypt data encrypted with the global FHE key:

- **Distributed Decryption**: Decryption is performed collectively by a subset of validators, ensuring no single validator can decrypt data on its own.
- **Security Guarantees**: Protects against malicious actors by requiring multiple validators to cooperate for decryption.

**Why Threshold Decryption?**

- **Enhanced Security**: Prevents any single point of failure or trust, as decryption requires collaboration among multiple validators.
- **Scalability**: Allows the network to handle decryption requests efficiently without relying on a single trusted entity.

### Precompiled Contracts for FHE Operations

fhEVM uses precompiled contracts to handle FHE operations:

- **Efficiency**: Offloads complex cryptographic computations from the EVM to more efficient execution environments.
- **Integration**: Exposes FHE operations as precompiled contracts with static addresses, enabling easy integration with Solidity smart contracts.

### Encrypted Data Types and Operations

fhEVM introduces encrypted data types and operations through the `TFHE` library:

- **Encrypted Integers**: `euint8`, `euint16`, and `euint32` for handling encrypted integer data.
- **Encrypted Booleans**: `ebool` for handling encrypted boolean data.
- **Homomorphic Operations**: Supports typical arithmetic, boolean, and comparison operations on encrypted data.

**Example Usage:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "fhEVM/TFHE.sol";

contract MyFirstFheContract {
    function verify(bytes calldata amountCt) public returns (euint32) {
        euint32 amount = TFHE.asEuint32(amountCt);
        return amount;
    }

    function compute(euint32 x, euint32 y, euint32 z) public returns (euint32) {
        return TFHE.mul(TFHE.add(x, y), z);
    }
}
```

### Privileged Memory and Storage
To ensure the security and integrity of encrypted data, fhEVM employs privileged memory and storage mechanisms:

- **Privileged Memory**: Keeps a mapping between handles and ciphertexts, ensuring only valid ciphertexts are used in computations.
- **Privileged Storage**: A special storage area that only the fhEVM can manipulate, used to store encrypted values securely.

**Why Privileged Memory and Storage?**

- **Security**: Prevents unauthorized access and manipulation of encrypted data.
- **Integrity**: Ensures that only valid and securely obtained ciphertexts are used in smart contracts.


## Example Applications of fhEVM
- **Encrypted ERC-20 Tokens**: Maintains confidentiality of token balances by encrypting balances and operations.
- **Blind Auctions**: Conducts privacy-preserving auctions without revealing individual bids.
- **Privacy-Enhanced DAOs**: Enables confidential voting and treasury management within decentralized autonomous organizations.
- **Decentralized Identifiers (DID)**: Securely manages and verifies digital identities, protecting user privacy.

## Resources

- [fhEVM Repository](https://github.com/zama-ai/fhevm)
- [fhEVM Documentation](https://docs.zama.ai/fhevm)
- [fhEVM Whitepaper](https://github.com/zama-ai/fhevm/blob/main/fhevm-whitepaper.pdf)
