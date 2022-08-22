import { IconBook } from "@tabler/icons";

import { client } from "./api";
import { PartyView } from "./component/PartyView";
import { ServantSelect } from "./component/ServantSelect";

const boi = async () => {
  const gong = await client.getServant(258);
  const bride = await client.getServant(258);
  const arash = await client.getServant(258);
  const skadi = await client.getServant(258);
  const zekerlot = await client.getServant(258);
  return [zekerlot, bride, skadi, arash, gong, skadi];
};

export function Trismegistus() {
  return (
    <div className="container m-auto text-center text-gray-800">
      <IconBook />
      Trismegistus
      <PartyView />
    </div>
  );
}
