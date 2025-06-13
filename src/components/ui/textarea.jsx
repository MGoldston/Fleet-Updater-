export function Textarea({ value, onChange, placeholder }) {
  return <textarea value={value} onChange={onChange} placeholder={placeholder} className="border rounded px-3 py-2 w-full" />;
}