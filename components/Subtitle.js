import React from "react";

export default function Subtitle({ children }) {
  return (
    <h3 className="mt-2 text-xl font-semibold leading-7 text-gray-900">
      {children}
    </h3>
  );
}
