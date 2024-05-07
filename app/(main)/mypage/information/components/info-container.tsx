import { Info } from "./info";
import { InfoAccount } from "./info-account";
import { InfoPassword } from "./info-password";

export const InfoContainer = () => {
  return (
    <div className="my-6 flex flex-col items-center space-y-10">
      <Info />
      <InfoPassword />
      <InfoAccount />
    </div>
  );
};
