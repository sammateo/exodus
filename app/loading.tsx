import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center text-center">
      <img src={"/images/rspca_logo.jpg"} className="h-16" />
      Loading...
    </div>
  );
};

export default Loading;
