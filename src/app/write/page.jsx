"use client";

import React, { useState } from "react";
import styles from "./writePage.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.bubble.css";

const WritePage = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const router = useRouter();

  if (status === "loading") return <p className={styles.loading}>Loading...</p>;
  if (status === "unauthenticated") return router.push("/login");

  const handleUpload = async () => {
    if (!file) return alert("Please choose an image first!");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url; // Cloudinary image URL
  };

  const handlePublish = async () => {
    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await handleUpload();
      }

      // 🧹 Clean HTML tags from Quill editor value
      const plainDesc = value.replace(/<[^>]*>?/gm, "").trim();

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc: plainDesc, // ✅ store clean text only
          image: imageUrl, // match Prisma schema
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.editor}>
        <button className={styles.button}>
          <Image
            src="/plus.png"
            alt="editor"
            width={30}
            height={30}
            onClick={() => setOpen(!open)}
          />
        </button>

        {open && (
          <div className={styles.add}>
            <label htmlFor="image" className={styles.addButton}>
              <Image src="/external.png" alt="add" width={30} height={30} />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        )}

        <ReactQuill
          theme="bubble"
          className={styles.textArea}
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />

        <button className={styles.publish} onClick={handlePublish}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default WritePage;
