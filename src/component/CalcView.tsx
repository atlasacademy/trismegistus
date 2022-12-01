import { Servant } from "@atlasacademy/api-connector";
import { calcSvt, CalcVals } from "fgo-calc";

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
  return <></>;
}
