import React from "react";

type Props = {
  children: React.ReactNode;
};

const H2Black = ({ children }: Props) => {
  return (
    <h2 style={{ color: "black" }} className={"ms-1"}>
      {children}
    </h2>
  );
};

export default H2Black;
