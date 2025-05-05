
import React from "react";

export const SidePanel = ({ topContent, bottomContent }:any) => {
  return (
    <div className="flex flex-col gap-6">
      <div>{topContent}</div>
      <div>{bottomContent}</div>
    </div>
  );
};
