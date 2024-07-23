"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

import toast, { Toaster } from "react-hot-toast";

import Modal from "./modal";
import Input from "./input";
import Button from "./button";
import { uploadSong } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  author: string;
  song: File | null;
  image: File | null;
}

const UploadModal = () => {
  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const uploadModal = useUploadModal();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    song: null,
    image: null
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { user } = useUser();

  const router = useRouter();

  const {
    register,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "song" && files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
    } else if (name === "image" && files && files) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async(e) => {
    e.preventDefault();
    
    const data = new FormData();
    const userId = user?._id;
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append("uploader", userId as string);
    if (formData.song) {
      data.append('song', formData.song);
    }
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      setIsLoading(true);      

      // upload song
      await uploadSong(data);

      // clear form data
      setFormData({
        title: "",
        author: "",
        song: null,
        image: null
      });

      // toast
      toast.success("Song uploaded successfully");

      // close modal
      uploadModal.onClose();

      // redirect to home
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <form
        className="
          flex
          flex-col
          gap-y-4
        "
        onSubmit={onSubmit}
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
          value={formData.title}
          onChange={handleChange}
          name="title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
          value={formData.author}
          onChange={handleChange}
          name="author"
        />
        <div>
          <div className="pb-1">
            Select a song file
          </div>

          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
            onChange={handleChange}
            name="song"
          />
        </div>

        <div className="w-full flex flex-col items-start justify-center">
          <div className="pb-1">
            Select an image
          </div>

          {/* image */}
          <div
            className="
              w-[100px]
              h-[100px]
              rounded-sm
              bg-neutral-700
              flex
              items-center
              justify-center
              cursor-pointer
              hover:bg-gray-700
              relative
              focus:outline-none
            "
            style={{
              backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Input
              id="image"
              type="file"
              disabled={isLoading}
              accept="image/*"
              {...register('image', { required: true })}
              onChange={handleChange}
              name="image"
              className="
                invisible
                w-full
                h-full
                absolute
              "
            /> 
            {!avatarPreview && <label className="cursor-pointer w-full h-full flex items-center justify-center" htmlFor="image">+</label>}
          </div>
        </div>
        <Button className="text-white" disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;
