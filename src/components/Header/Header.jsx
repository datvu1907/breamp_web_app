import React, { useState } from "react";

import { auth, logOut } from "../../firebase";
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

const Header = (props) => {
  const {handleOnClickLogin} = props;
  // const isConnected = Boolean(accounts[0])
  const [accounts, setAccounts] = useState([0]);
  const isConnected = Boolean(accounts[0]);


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
          {auth.currentUser == null ? (
            <button
              class="primary__button btn btn-primary"
              onClick={() => {
                handleOnClickLogin();
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
                <div class="dropdown text-end">
                  <div
                    href="#"
                    class="d-block link-dark text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={localStorage.getItem("profilePic")}
                      alt="mdo"
                      width="32"
                      height="32"
                      class="rounded-circle"
                    />
                  </div>
                  <ul class="dropdown-menu text-small">
                    <li>
                      <a class="dropdown-item" href="#">
                        New project...
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Profile
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider"></hr>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={()=> {logOut()}}>
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
