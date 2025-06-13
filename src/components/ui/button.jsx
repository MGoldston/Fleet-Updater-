export function Button({ children, onClick, className = "", variant = "default", size = "md" }) {
  const color = variant === "destructive" ? "bg-red-600" : "bg-blue-600";
  return <button onClick={onClick} className={`text-white px-4 py-2 rounded ${color} ${className}`}>{children}</button>;
}