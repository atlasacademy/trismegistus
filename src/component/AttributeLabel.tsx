export interface AttributeLabelProps {
  name: string;
  value: number;
}

export function AttributeLabel({ name, value }: AttributeLabelProps) {
  return (
    <div>
      {name}: {value}
    </div>
  );
}
