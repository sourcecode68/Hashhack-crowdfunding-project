export const factoryContractAddress =
  "0x1AF00ddfBE430a78C8823B18Ca285079328D7992";
export const factoryAbi = [
  {
    type: "function",
    name: "allFundMeContracts",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "contract FundMe" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "create",
    inputs: [
      { name: "_name", type: "string", internalType: "string" },
      { name: "_deadline", type: "string", internalType: "string" },
      { name: "_description", type: "string", internalType: "string" },
      { name: "_goalAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllContracts",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserContracts",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_fund",
    inputs: [
      { name: "contractAddress", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "s_withdraw",
    inputs: [
      { name: "contractAddress", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userFundMeContracts",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "address", internalType: "contract FundMe" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "FundMeCreated",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "contractAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
];
export const fundMeAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "_deadline", type: "string", internalType: "string" },
      { name: "_description", type: "string", internalType: "string" },
      { name: "_goalAmount", type: "uint256", internalType: "uint256" },
      { name: "_owner", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "fund",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "fundsList",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "get_version",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "minimumUsd",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  { type: "error", name: "FundMe_NotOwner", inputs: [] },
];
