export function Card({ children, className = "" }) {
  return <div className={`border rounded-lg shadow-sm p-4 bg-white ${className}`}>{children}</div>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}