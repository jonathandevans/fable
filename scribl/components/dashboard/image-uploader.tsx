"use client";

import { cn } from "@/lib/utils";
import { FileImage, Loader2, XIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { createBrowserClient } from "@/lib/supabase/client";
import Image from "next/image";

export function ImageUploader({
  setParentState,
}: {
  setParentState: (_: string | null) => void;
}) {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    const supabase = createBrowserClient();
    const user = await supabase.auth.getUser();

    let i = 0;
    while (true) {
      const { data, error } = await supabase.storage
        .from("private")
        .upload(
          `${user.data.user?.id}/${i > 0 ? `(${i}) ` : ""}${file.name}`,
          file
        );
      if (error?.message == "The resource already exists") {
        i++;
        continue;
      }

      if (data?.path) {
        setParentState(data.path);
        const _url = await supabase.storage
          .from("private")
          .createSignedUrl(data.path, 600);
        setUrl(_url.data?.signedUrl!);
        setImagePath(data.path);
      }
      break;
    }
  };

  return (
    <>
      {imagePath ? (
        <div className="relative w-fit">
          <Image
            src={url!}
            alt="Site image"
            width={250}
            height={100}
            className="w-[250px] h-auto object-cover border border-primary rounded-xl"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-0 right-0"
            onClick={async () => {
              const supabase = createBrowserClient();
              const { data, error } = await supabase.storage
                .from("private")
                .remove([imagePath]);
              if (error) console.log(error);

              setParentState(null);
              setUrl(null);
              setImagePath(null);
            }}
          >
            <XIcon />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-y-1 border transition-all rounded-md py-10",
            dragOver ? "border-primary" : "border-zinc-200"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setDragOver(false);
            const file = e.dataTransfer.files[0];
            startTransition(async () => await handleUpload(file));
          }}
        >
          <input
            form=""
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              if (!e.target.files) return;
              const file = e.target.files[0];

              startTransition(async () => await handleUpload(file));
            }}
          />

          {pending ? (
            <>
              <Loader2 className="bg-primary/20 p-2 size-15 rounded-full mx-auto text-primary animate-spin" />
              <h6 className="text-lg">Image is being uploaded</h6>
              <p className="text-muted-foreground text-sm">
                Just bear with us a moment, your image is being uploaded.
              </p>
            </>
          ) : (
            <>
              {" "}
              <FileImage className="bg-primary/20 p-2 size-15 rounded-full mx-auto text-primary" />
              <h6 className="text-lg">Upload an Image</h6>
              <p className="text-muted-foreground text-sm">
                Either{" "}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => inputRef.current?.click()}
                >
                  click here
                </Button>{" "}
                to upload an image, or drag and drop.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
