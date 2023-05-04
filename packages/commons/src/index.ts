export interface EnumMapping<T extends string = string> {
  indexes: Record<T, number>;
  options: T[];
}
