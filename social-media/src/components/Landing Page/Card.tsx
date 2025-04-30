
import React from "react";

export const Card = ({ children }:any) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">
      {children}
    </div>
  );
};
