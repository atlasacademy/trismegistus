export interface AttributeLabelProps {
  name: string;
  value: number;
}

export function AttributeLabel({ name, value }: AttributeLabelProps) {
  return (
    <div className="mx-2">
      {name}: {value}
    </div>
  );
}
