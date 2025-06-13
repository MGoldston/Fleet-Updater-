
export function Select({ value, onValueChange, children }) {
  return <div>{children}</div>;
}
export function SelectTrigger({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function SelectContent({ children }) {
  return <div>{children}</div>;
}
export function SelectItem({ value, children }) {
  return (
    <div
      className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
      onClick={() => value && alert(\`Selected: \${value}\`)}
    >
      {children}
    </div>
  );
}
