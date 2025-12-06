import React from "react";

const NewSpinner = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-screen bg-white">
      <div
        className="w-20 h-20 rounded-full border-6 border-t-6 border-transparent animate-spin"
        style={{
          borderTopColor: "#3b82f6",  
          borderRightColor: "#8b5cf6", 
        }}
      ></div>
      <p className="font-[Nunito] text-black text-3xl">Hang on. Getting you there...</p>
    </div>
  );
};

export default NewSpinner;
