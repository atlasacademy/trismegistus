import { Servant } from "@atlasacademy/api-connector";
import { calcSvt, CalcVals } from "fgo-calc";

import { useServantQuery } from "@/api";
import { useSelector } from "@/store";

interface DamageRangeProps {
  npLevel: number;
  servant: Servant.Servant;
}

function DamageRange({ servant, npLevel }: DamageRangeProps) {
  const {
    damageFields: { damage, minrollDamage, maxrollDamage },
  } = calcSvt(servant, `np${npLevel}`).vals as CalcVals;
  return (
    <div>
      <div className="w-32">
        <div className="w-full border">{damage}</div>
        <div className="flex">
          <div className="w-1/2 border">{minrollDamage}</div>
          <div className="w-1/2 border">{maxrollDamage}</div>
        </div>
      </div>
    </div>
  );
}

export function CalcView() {
  const servantId = useSelector((state) => state.party.servants[0]);
  const { data: servant } = useServantQuery(servantId);
  if (servant == null) {
    return <></>;
  }
  return (
    <div className="flex">
      <DamageRange npLevel={1} servant={servant} />
      <DamageRange npLevel={2} servant={servant} />
      <DamageRange npLevel={3} servant={servant} />
      <DamageRange npLevel={4} servant={servant} />
      <DamageRange npLevel={5} servant={servant} />
    </div>
  );
}
