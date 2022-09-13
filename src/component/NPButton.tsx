import { FieldMemberSlot } from "@/types";

export interface NPButtonProps {
  slot: FieldMemberSlot;
}

export function NPButton({ slot }: NPButtonProps) {
  return <button className="size-mini border">Servant {slot + 1}</button>;
}
