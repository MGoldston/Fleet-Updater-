import { useState } from "react";

export function Select({ children, onValueChange, value }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>{children.find(c => c.type.name === "SelectTrigger")}</div>
      {open && (
        <div className="absolute z-10 bg-white border rounded mt-1 w-full">
          {children.find(c => c.type.name === "SelectContent").props.children.map(item =>
            <div key={item.props.value} onClick={() => { onValueChange(item.props.value); setOpen(false); }}>
              {item}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SelectTrigger({ children }) {
  return <div className="border px-3 py-2 rounded cursor-pointer bg-gray-50">{children}</div>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ children, value }) {
  return <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{children}</div>;
}