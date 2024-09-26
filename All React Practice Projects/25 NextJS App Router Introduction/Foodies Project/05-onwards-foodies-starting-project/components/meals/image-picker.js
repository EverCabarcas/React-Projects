"use client";
import { useRef, useState } from "react";
import clasess from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();
  function handlePickImage() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={clasess.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={clasess.controls}>
        <div className={clasess.preview}>
            {!pickedImage && <p>No image picked yet.</p>}
            {pickedImage && (
                <Image src={pickedImage} alt="" fill required/>
            )}  
        </div>
        <input
          ref={imageInputRef}
          className={clasess.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        ></input>
      </div>
      <button
        className={clasess.button}
        type="button"
        onClick={handlePickImage}
      >
        Pick an Image
      </button>
    </div>
  );
}
