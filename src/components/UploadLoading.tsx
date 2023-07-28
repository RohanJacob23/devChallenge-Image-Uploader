"use client";

import React from "react";

export default function UploadLoading({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col w-[25rem] h-36 bg-white shadow-md rounded-lg px-8 py-9">
      <h1 className="text-lg font-medium text-[#4F4F4F] mb-7">Uploading...</h1>

      <progress value={progress} max="100" className="w-full h-3"></progress>
    </div>
  );
}
