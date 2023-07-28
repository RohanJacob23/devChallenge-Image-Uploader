"use client";

import React from "react";
import Image from "next/image";

interface ImageDropAreaProps {
  dragging: boolean;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageDropArea({
  dragging,
  handleDrop,
  handleDragOver,
  setDragging,
  handleFileInput,
}: ImageDropAreaProps) {
  return (
    <div className="flex flex-col items-center w-[25rem] h-[29rem] bg-white shadow-md rounded-lg py-9">
      <h1 className="text-lg text-[#4F4F4F] font-medium mb-4">
        Upload your Image
      </h1>

      <p className="mb-[1.85rem] text-xs font-medium text-[#828282]">
        File should be Jpeg,Png,...
      </p>

      <div
        className={`flex flex-col items-center w-[21rem] h-[13.68rem] bg-[#F6F8FB] border ${
          dragging ? "border-red-500" : "border-[#97BEF4]"
        } border-dashed rounded-xl`}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={() => setDragging(false)}
      >
        <Image
          src="/Images/image.svg"
          alt="upload"
          width={114}
          height={88}
          className="my-9 rounded-lg"
        />

        <h1 className="text-xs font-medium text-[#BDBDBD]">
          Drag & Drop your Image Here
        </h1>
      </div>

      <p className="text-[#BDBDBD] text-xs font-medium mt-5 mb-5">Or</p>

      <label
        htmlFor="file"
        className="w-[6.31rem] h-8 rounded-lg bg-[#2F80ED] font-medium text-xs text-white text-center cursor-pointer px-2 py-2"
      >
        Choose a file
      </label>
      <input
        type="file"
        name="file"
        id="file"
        accept=".png,.jpeg"
        className="hidden"
        onChange={(e) => handleFileInput(e)}
      />
    </div>
  );
}
