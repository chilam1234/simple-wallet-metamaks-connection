import { useState } from "react";
import { ethers } from "ethers";
import { SignedMessage } from "../../types";
import "./MessageSigningSection.css";
import Card from "../Card";

type MessageSigningSectionProps = {
  ethProvider: ethers.providers.Web3Provider;
};
export default function MessageSigningSection({
  ethProvider,
}: MessageSigningSectionProps) {
  const [signatures, setSignatures] = useState<SignedMessage[]>([]);
  const [message, setMessage] = useState("");

  const signMessage = async (message: string) => {
    try {
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }

      const signer = ethProvider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      return {
        message,
        signature,
        address,
      };
    } catch (err: any) {}
  };

  const handleSign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sig = await signMessage(message);
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSign}>
        <>
          <main>
            <h2 className="main-title">Sign messages</h2>
            <div className="my-3">
              <textarea
                required
                name="message"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </main>
          <button type="submit" className="sign-button">
            Sign message
          </button>
          <div className="message-section">
            {signatures.map((sig, idx) => {
              return (
                <div key={sig.signature}>
                  <p className="secondary-title">
                    Message {idx + 1}: {sig.message}
                  </p>
                  <p
                    className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                    placeholder="Generated signature"
                  >
                    {sig.signature}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      </form>
    </Card>
  );
}
