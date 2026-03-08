"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  ImageKitProvider,
  Image as IKImage,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { UploadCloud, X } from "lucide-react";

const authenticator = async () => {
  try {
    const response = await fetch("/api/auth/imagekit");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Upload = ({ value, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size too large", {
        description: "Please upload a file less than 20MB",
      });
      return;
    }

    if (fileInputRef.current) fileInputRef.current.value = "";

    setUploading(true);
    setProgress(0);
    abortControllerRef.current = new AbortController();

    try {
      const { token, expire, signature, publicKey: pk } = await authenticator();

      const response = await upload({
        file,
        fileName: file.name,
        token,
        signature,
        expire,
        publicKey: pk ?? process.env.IMAGEKIT_PUBLIC_KEY!,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortControllerRef.current.signal,
      });

      setPreview(response.filePath);
      if (response.url) onChange(response.url);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        toast.error("Upload cancelled");
      } else if (error instanceof ImageKitInvalidRequestError) {
        toast.error("Invalid request: " + error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        toast.error("Network error: " + error.message);
      } else if (error instanceof ImageKitServerError) {
        toast.error("Server error: " + error.message);
      } else {
        toast.error("Upload failed");
      }
    } finally {
      setUploading(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAbort = () => {
    abortControllerRef.current?.abort();
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full rounded-md overflow-hidden">
          <ImageKitProvider
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
          >
            <IKImage
              src={preview}
              alt="Avatar"
              width={400}
              height={300}
              className="object-cover max-h-60"
            />
          </ImageKitProvider>
          <Button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 p-2 h-auto z-10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <div
            onClick={
              !uploading ? () => fileInputRef.current?.click() : undefined
            }
            className="w-full min-h-9 rounded-md border border-input dark:bg-input/30 bg-transparent px-3 py-1 flex flex-col gap-2 items-center justify-center cursor-pointer"
          >
            {uploading ? (
              <>
                <p className="text-sm">Uploading... {Math.round(progress)}%</p>
                <div className="bg-green-600 w-full max-w-xs rounded-full h-2">
                  <div
                    className=" h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAbort}
                  className="mt-2 text-xs px-4 py-1 h-auto"
                >
                  Cancel Upload
                </Button>
              </>
            ) : (
              <UploadCloud />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
};

export default Upload;
