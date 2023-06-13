export interface LevelDisplayProps {
  stats: Record<string, number[]>;
}

function normalizeStats(
  stats: Record<string, number[]>
): [[string, number[]][], number] {
  const statMatrix = Object.entries(stats);
  const lmc = statMatrix.reduce((acc, [, next]) => {
    const columns = next.length || 1;
    if (acc % columns === 0) {
      return acc;
    }
    return acc * columns;
  }, 1);
  return [statMatrix, lmc];
}

export function StatTable({ stats }: LevelDisplayProps) {
  const [statMatrix, lmc] = normalizeStats(stats);
  return (
    <table className="w-full table-auto text-center">
      <tbody>
        {statMatrix.map(([label, values]) => (
          <tr key={label}>
            <td>{label}</td>
            {values.map((value, index) => (
              <td key={index} colSpan={lmc / values.length} className="w-12">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
