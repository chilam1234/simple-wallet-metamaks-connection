import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { EnsInfo } from "../types";

import "./MainContainer.css";
import MessageSigningSection from "../components/MessageSigningSection";
import InfoCard from "../components/InfoCard";

function MainContainer() {
  const { ethereum } = window;
  const [haveMetamask, setHaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [chainId, setChainId] = useState(NaN);
  const [ensInfo, setEnsInfo] = useState<EnsInfo>({
    name: null,
    avatar: null,
  });
  const [isConnected, setIsConnected] = useState(false);

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(ethereum),
    [ethereum]
  );

  useEffect(() => {
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        setHaveMetamask(false);
      }
      setHaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, [ethereum]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setHaveMetamask(false);
      }
      const accounts: string[] = await ethereum?.request?.({
        method: "eth_requestAccounts",
      });
      const walletAccount = accounts?.[0];
      const balance = ethers.utils.formatEther(
        await provider.getBalance(walletAccount)
      );
      setEnsInfo(await getEnsInfo(walletAccount));

      setAccountAddress(walletAccount);
      setAccountBalance(balance);
      setChainId(provider.network.chainId);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccountAddress("");
    setAccountBalance("");
    setEnsInfo({ name: null, avatar: null });
    setChainId(NaN);
  };

  const getEnsInfo = async (address: string): Promise<EnsInfo> => {
    const ensName = await provider.lookupAddress(address);
    const avatar = await provider.getAvatar(ensName ?? "");

    return {
      name: ensName,
      avatar,
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="flex-container">
            {isConnected ? (
              <>
                <InfoCard
                  accountAddress={accountAddress}
                  accountBalance={accountBalance}
                  ensInfo={ensInfo}
                  chainId={chainId}
                />
                <MessageSigningSection ethProvider={provider} />
                <button className="btn" onClick={disconnectWallet}>
                  Disconnect
                </button>
              </>
            ) : (
              <>
                <h2>Welcome</h2>
                <button className="btn" onClick={connectWallet}>
                  Connect
                </button>
              </>
            )}
          </div>
        ) : (
          <p>Please Install MetaMask</p>
        )}
      </header>
    </div>
  );
}

export default MainContainer;
