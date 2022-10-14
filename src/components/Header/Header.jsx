import React, { useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { signInWithTwitter } from "../../firebase";
// import { ethers } from "ethers";
import DSCBook from "../../data/DSCBook.json";
import "./Header.css";
import AddModal from "../AddModal/AddModal";

const Web3 = require("web3");
const web3 = new Web3(process.env.RPC_URL);
const caver = new Web3(
  new Web3.providers.HttpProvider(
    "https://public-node-api.klaytnapi.com/v1/cypress"
  )
);

const Header = () => {
  // const isConnected = Boolean(accounts[0])
  const [accounts, setAccounts] = useState([0]);
  const isConnected = Boolean(accounts[0]);
  const [isLogin, setIsLogin] = useState(false);

  async function handleSubmit() {
    const chainId = 8217; // Klaytn Testnet

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(chainId) }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Klay mainnet",
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: {
                  name: "KLAY",
                  decimals: 18,
                  symbol: "KLAY",
                },
                rpcUrls: ["https://public-en.kaikas.io/v1/cypress"],
              },
            ],
          });
        }
      }
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // setAccounts(account);
      setAccounts(account[0]);
    }
  }

  return (
    <div className="app">
      <div className="app__header">
        <img
          class="logo-size"
          src="./Image/Logo_Background.png"
          height="40"
          padding-left="200px"
          alt=""
        ></img>
        <div className="app__headerWrapper">
          {!isLogin ? (
            <button
              class="primary__button btn btn-primary"
              onClick={() => {
                signInWithTwitter(setIsLogin);
              }}
            >
              Sign in Twitter
            </button>
          ) : (
            <>
              <AddModal></AddModal>
              <div className="app__headerButtons">
                {isConnected ? (
                  <div className="second__button btn btn-secondary formatButton word">
                    {accounts}
                  </div>
                ) : (
                  <button
                    className="primary__button btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Connect Wallet
                  </button>
                )}
                <img
                  src={localStorage.getItem("profilePic")}
                  alt="mdo"
                  width="32"
                  height="32"
                  class="rounded-circle"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
