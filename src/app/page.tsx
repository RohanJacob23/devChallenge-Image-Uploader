"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import ImageDropArea from "@/components/ImageDropArea";
import UploadLoading from "@/components/UploadLoading";
import AfterUpload from "@/components/AfterUpload";

export default function Home() {
  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const uploadPreset = "y2hbrubt";
  const URL = "https://api.cloudinary.com/v1_1/dsgswsu80/image/upload";

  const uploadFile = (formData: FormData) => {
    axios
      .post(URL, formData, {
        onUploadProgress: (progressEvent) => {
          let percentCompleted;
          if (
            progressEvent.total !== null &&
            progressEvent.total !== undefined
          ) {
            percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          } else {
            percentCompleted = 0; // Unable to compute progress if total size is unknown
          }
          setProgress(percentCompleted);
        },
      })
      .then((res) => {
        setImageUrl(res.data.url);
        setIsLoading(false);
        setLoaded(true);
        setProgress(0);
      })
      .catch((err) => console.log(err));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const file = e.dataTransfer.files[0];
    if (!allowedFileTypes.includes(file.type)) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    uploadFile(formData);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      uploadFile(formData);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <main className="flex items-center justify-center">
      {!isLoading && !loaded && (
        <ImageDropArea
          dragging={dragging}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileInput={handleFileInput}
          setDragging={setDragging}
        />
      )}

      {isLoading && <UploadLoading progress={progress} />}

      {loaded && (
        <AfterUpload copied={copied} imageUrl={imageUrl} copyLink={copyLink} />
      )}
    </main>
  );
}
