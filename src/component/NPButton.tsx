import { FieldMember } from "@/types";

export interface NPButtonProps {
  slot: FieldMember;
}

export function NPButton({ slot }: NPButtonProps) {
  return <button className="size-mini border">Servant {slot + 1}</button>;
}
