"use client";

import React from "react";
import Image from "next/image";

export default function AfterUpload({
  imageUrl,
  copyLink,
  copied,
}: {
  imageUrl: string;
  copyLink: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex flex-col items-center w-64 md:w-[25rem] md:h-[28.44rem] bg-white shadow-md rounded-lg px-4 md:px-8 py-9">
      <div className="flex justify-center items-center rounded-full bg-[#219653] p-2 mt-1 mb-2">
        <Image src="/Icons/check.svg" alt="check-icon" width={28} height={28} />
      </div>

      <h1 className="text-lg font-medium text-[#4F4F4F] mb-6">
        Uploaded Successfully!
      </h1>

      <div className="relative w-full h-36 md:w-full md:h-full mb-6">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="image"
            fill
            className="object-cover rounded-xl"
            priority={true}
          />
        )}
      </div>

      <div className="relative flex items-center justify-between rounded-lg border border-[#E0E0E0] bg-[#F6F8FB] p-1 w-full gap-2">
        <p className="text-xs overflow-hidden w-60 h-3">{imageUrl}</p>

        <button
          className="text-xs text-white bg-[#2F80ED] rounded-lg w-[4.625rem] h-[1.875rem] font-medium"
          onClick={copyLink}
        >
          Copy Link
        </button>
        <span
          className={`absolute -top-[1.3rem] right-1 md:right-3 text-white text-xs bg-[#219653] ${
            copied ? "opacity-100" : "opacity-0"
          } rounded-lg p-1 transition-opacity duration-200`}
        >
          Copied
        </span>
      </div>
    </div>
  );
}
