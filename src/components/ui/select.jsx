import { useState } from "react";

export function Select({ children, onValueChange, value }) {
  return <div className="w-full">{children}</div>;
}

export function SelectTrigger({ children }) {
  return <div className="border px-3 py-2 rounded cursor-pointer bg-gray-50">{children}</div>;
}

export function SelectContent({ children }) {
  return <div className="border mt-1 rounded bg-white shadow-md">{children}</div>;
}

export function SelectItem({ children, value }) {
  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        const event = { target: { value } };
        if (typeof value === "function") value(event);
        else document.dispatchEvent(new CustomEvent("select-item", { detail: value }));
      }}
    >
      {children}
    </div>
  );
}