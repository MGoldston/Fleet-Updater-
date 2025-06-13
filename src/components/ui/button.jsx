export function Button({ children, onClick, variant = "default" }) {
  const styles = {
    default: "bg-blue-600 text-white px-4 py-2 rounded",
    destructive: "bg-red-600 text-white px-4 py-2 rounded"
  };
  return <button onClick={onClick} className={styles[variant] || styles.default}>{children}</button>;
}