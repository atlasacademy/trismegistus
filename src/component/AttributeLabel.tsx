export interface AttributeLabelProps {
  name: string;
  value: number | string;
}

export function AttributeLabel({ name, value }: AttributeLabelProps) {
  return (
    <div>
      {name}: {value}
    </div>
  );
}
