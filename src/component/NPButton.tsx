import { useState } from "react";
import { Button } from "react-daisyui";

import { FieldMemberSlot } from "@/types";

export interface NPButtonProps {
  slot: FieldMemberSlot;
}

export function NPButton({ slot }: NPButtonProps) {
  const [active, setActive] = useState(false);
  return (
    <Button
      className="size-mini"
      variant={active ? undefined : "outline"}
      onClick={() => setActive(!active)}
    >
      {slot + 1}
    </Button>
  );
}
