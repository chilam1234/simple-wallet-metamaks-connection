import { EnsInfo } from "../../types";
import logo from "../../logo.svg";
import Card from "../Card";

type InfoCardProps = {
  accountAddress: string;
  chainId: number;
  accountBalance: string;
  ensInfo: EnsInfo;
};
function InfoCard({
  accountAddress,
  chainId,
  accountBalance,
  ensInfo,
}: InfoCardProps) {
  return (
    <Card>
      {ensInfo?.avatar ? (
        <img src={ensInfo?.avatar ?? ""} alt="avatar" />
      ) : (
        <img src={logo} alt="avatar" />
      )}
      {ensInfo?.name ? (
        <>
          <h2 className="main-title">{ensInfo.name}</h2>
          <p className="secondary-title">
            {accountAddress.slice(0, 4)}...
            {accountAddress.slice(38, 42)}
          </p>
        </>
      ) : (
        <p className="main-title">
          {accountAddress.slice(0, 4)}...
          {accountAddress.slice(38, 42)}
        </p>
      )}

      <h3>Wallet Balance:</h3>
      <p>
        {accountBalance} <b>eth</b>
      </p>

      <h3>Chain Id:</h3>
      <p>{chainId}</p>
    </Card>
  );
}

export default InfoCard;
