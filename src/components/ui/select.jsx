export function Select({ value, onValueChange, children }) {
  return <div>{children}</div>;
}
export function SelectTrigger({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function SelectContent({ children }) {
  return <div className="border rounded p-2">{children}</div>;
}
export function SelectItem({ value, children }) {
  return <div onClick={() => onValueChange(value)} className="cursor-pointer hover:bg-gray-200 p-1 rounded">{children}</div>;
}