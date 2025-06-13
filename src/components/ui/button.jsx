
export function Button({ children, onClick, className = "", variant = "default", size = "md" }) {
  return (
    <button
      onClick={onClick}
      className={\`px-4 py-2 rounded text-white \${variant === "destructive" ? "bg-red-500" : "bg-blue-500"} \${className}\`}
    >
      {children}
    </button>
  );
}
