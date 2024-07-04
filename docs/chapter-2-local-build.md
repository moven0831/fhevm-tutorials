# Integrating FHE Functionalities

Congrats! Now that you get the concepts of the fhEVM protocol, let's build some nodes! In this tutorial, we'll show you how to integrate FHE functionalities into an EVM-compatible blockchain through a local build node.

This chapter is derived from the local build section in [zama-ai/evmos](https://github.com/zama-ai/evmos/tree/3994205101595478934db07ac84feb4cf4395d14). For more high-level details, check out the source.

## What You Can Expect After This Chapter
✅ Successfully integrating FHE functionalities into an EVM-compatible blockchain. \
✅ Understanding the necessary dependencies and their roles. \
✅ Setting up and running a local node with FHE capabilities. 

Let's get started!

## Download the Dependencies

Before starting, make sure you have the necessary dependencies installed. Here are the commands to build each dependency:

Ensure you have installed:
- **Go**: Needed for building and running the Evmos blockchain software.
- **Rust**: Required for compiling the tfhe-rs library.
- **Node.js**: v20 is preferred by [Hardhat](https://github.com/NomicFoundation/hardhat)

Then, execute the script to download repositories from GitHub:
```sh
bash download_repos.sh
```

Now, the custom [go-ethereum](https://github.com/zama-ai/go-ethereum/tree/52c7d94f40d96325b8018e58cec681a7c59bda34) and [ethermint](https://github.com/zama-ai/ethermint/tree/e0246dcbbf406de2691fb506e2512cd148850346) repositories are cloned at the same level as evmos. These repositories have been expanded by adding functionalities that enable smart contracts to compute on encrypted data.

## Summary of fhEVM Integration into a Custom Blockchain

If you want to integrate fhEVM into your custom EVM-compatible blockchain, check out [fhevm-go](https://github.com/zama-ai/fhevm-go). The detailed steps to integrate it into Geth are listed in the [fhevm-go integration docs](https://docs.zama.ai/fhevm-go/getting-started/integration) and should be applicable to other implementations with the same architecture.

### Modify Core and VM Files:
   - Update `core/state_transition.go` for gas calculations.
   - Modify `core/vm/contracts.go` to implement the `fheLib` precompile and update the `PrecompiledContract` interface.
   - Register FHEVM errors in `core/vm/errors.go`.
   - Add FHEVM-specific fields and methods in `core/vm/evm.go`.

### Adjust VM Operations and Methods:
   - Update opcodes in `core/vm/instructions.go` to call FHEVM implementations (e.g., `opSload`, `opSstore`, `opReturn`).
   - Add necessary methods in `core/vm/interpreter.go` and update the `Run` method for FHEVM.
   - Implement FHEVM stack methods in `core/vm/stack.go`.

### Update API and GraphQL Integrations:
   - Pass FHEVM-specific arguments in API calls within `internal/ethapi/api.go`.
   - Ensure FHEVM arguments are properly set for GraphQL calls in `graphql/graphql.go`.

## Prepare tfhe-rs C API

To use the tfhe-rs library, you need to prepare its C API. Follow these steps:

### Build

```sh
# In evmos root folder
make build_c_api_tfhe
```

This will clone the tfhe-rs repository in the `work_dir` folder and build the C API in `work_dir/tfhe-rs/target/release`. If you have your own tfhe-rs repository, the `TFHE_RS_PATH` environment variable can be set in the `.env` file.

### Copy tfhe Header File and C Library
To extend Geth, we provide access to all tfhe operations gathered in the C library through pre-compiled smart contracts. Check the file called **tfhe.go** in `go-ethereum/core/vm` for more details.

Geth needs the `tfhe.h` header file located in `go-ethereum/core/vm` and the **libtfhe.so** (Linux) or **libtfhe.dylib** (Mac) in `go-ethereum/core/vm/lib`.

```sh
cp work_dir/tfhe-rs/target/release/tfhe.h ../go-ethereum/core/vm
mkdir -p ../go-ethereum/core/vm/lib
# Mac
cp work_dir/tfhe-rs/target/release/libtfhe.dylib ../go-ethereum/core/vm/lib
# Linux
cp work_dir/tfhe-rs/target/release/libtfhe.so ../go-ethereum/core/vm/lib
# For Linux set LD_LIBRARY_PATH to libtfhe.so
```

### Prepare Custom go-ethereum and ethermint Repositories

To use custom go-ethereum and ethermint repositories, clone them at the same level as evmos, make your changes, and update the **go.mod** file accordingly:

```go
-replace github.com/ethereum/go-ethereum v1.10.19 => github.com/zama-ai/go-ethereum v0.1.10
+replace github.com/ethereum/go-ethereum v1.10.19 => ../go-ethereum
 
-replace github.com/evmos/ethermint v0.19.3 => github.com/zama-ai/ethermint v0.1.2
+replace github.com/evmos/ethermint v0.19.3 => ../ethermint
```

Here is the hierarchy of folders:
```txt
.
├── evmos
│   └── work_dir
│       └── tfhe-rs
├── go-ethereum
├── ethermint
```

### Build evmosd Binary
Next, build the `evmosd` binary directly in your system:

```sh
# In evmos root folder
make install
```

The binary is installed in your system's Go binary path (e.g., `$HOME/go/bin`). If needed, update your PATH environment variable to be able to run the `evmosd` binary from anywhere.

## Run the Node

### Prepare FHE Keys

```sh
LOCAL_BUILD_KEY_PATH="$HOME/.evmosd/zama/keys/network-fhe-keys" ./scripts/prepare_volumes_from_fhe_tool_docker.sh v0.2.0
```

This script generates FHE keys and copies them to the evmos home folder in `$HOME/.evmosd/zama/keys/network-fhe-keys`.

### Setup the Node
The script uses [jq](https://jqlang.github.io/jq/download/) for command-line JSON processing. Ensure you have downloaded it.

```sh
# jq is required
./setup.sh
```

### Start the Node

```sh
./start.sh
# In a new terminal, run the fhevm-decryption-db
docker run -p 8001:8001 ghcr.io/zama-ai/fhevm-decryptions-db:v0.1.5
```

Now, you can see the log of your local blockchain node with FHE functionalities.

### Faucet Your Address

```sh
# In evmos root folder
# Replace with your Ethereum address
python3 faucet.py 0xYourAddressHere
```

### Reset State

```sh
make clean-local-evmos
# must run ./setup.sh after
```

## Reference
For more details, visit the [zama-ai/evmos](https://github.com/zama-ai/evmos/tree/3994205101595478934db07ac84feb4cf4395d14). The repo offers a simpler version of running nodes; feel free to try it if the above tutorial is too complex at the moment.