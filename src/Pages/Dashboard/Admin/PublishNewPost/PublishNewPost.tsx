/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Select, { MultiValue } from "react-select";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axiosInstance";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { toast } from "sonner";
import "../../../../styles/swal.css";
import { ICategoryOption, FormData, IAuthor } from "./post.type";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";
import * as Switch from "@radix-ui/react-switch";

const PublishNewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    watch,
  } = useForm<FormData>();
  const title = watch("title", "");
  const [content, setContent] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState<boolean>(false); // Handle isFeatured Toggle

  // Categories
  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<ICategoryOption>
  >([]);
  const [categoriesOptions, setCategoriesOptions] = useState<ICategoryOption[]>(
    []
  );

  // Authors
  const [selectedAuthors, setSelectedAuthors] = useState<MultiValue<IAuthor>>(
    []
  );
  const [authorOptions, setAuthorOptions] = useState<IAuthor[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/categories");

        // Transform data to match react-select format
        // TODO: Add a type here
        const formattedCategories = data?.data?.map((category: any) => ({
          value: category.name,
          label: category.name,
        }));

        setCategoriesOptions(formattedCategories);
      } catch (error) {
        toast.error("Error fetching categories:");
      }
    };

    fetchCategories();
  }, []);

  // Handle Category Change
  const handleCategoriesChange = (
    selectedOptions: MultiValue<ICategoryOption>
  ) => {
    setSelectedCategories(selectedOptions || []); // Ensure it's an empty array when no categories are selected
  };

  // Fetch authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axiosInstance.get("/author");

        // TODO: Add a type here
        const formattedAuthors = data?.data?.map((author: any) => ({
          value: author.name,
          label: author.name,
        }));

        setAuthorOptions(formattedAuthors);
      } catch (error) {
        toast.error("Error fetching authors");
      }
    };

    fetchAuthors();
  }, []);

  // Handle author Change
  const handleAuthorsChange = (selectedOptions: MultiValue<IAuthor>) => {
    setSelectedAuthors(selectedOptions || []); // Ensure it's an empty array when no categories are selected
  };

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent); // Update the state in the parent
  };

  const onSubmit = async () => {
    const postData = {
      title: title,
      coverImage: uploadedImageUrl,
      author: ["123456789101213141522222"],
      isFeatured,
      tags,
      // TODO: Make author dynamic
      // author: selectedAuthors.map((author) => author?.value),
      content: content,
      category: selectedCategories.map((cat) => cat?.value),
    };

    console.log(postData);
    try {
      const res = await axiosInstance.post("/posts", postData, {
        headers: { "Content-Type": "application/json" },
      });
      // reset(); // Reset the form after submission
      // setContent(""); // Clear the content editor
      // setUploadedImageUrl(""); // Clear the uploaded image URL
      // setSelectedCategories([]); // Clear the selected categories
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Post added successfully.",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
    } catch (error: any) {
      console.log(error);
      handleAxiosError(error, "Failed to post.");
    }
  };

  return (
    <div className=" mx-10 my-10 ">
      <h1 className="text-2xl font-semibold mb-6 lg:mb-10 text-center text-blue-500 underline underline-offset-8">
        Post Something New
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full space-y-4  rounded-md p-5 bg-[#CBD5E1]"
      >
        {/* Title */}
        <div>
          <label className="block font-medium text-white">Title</label>
          <input
            type="text"
            placeholder="Enter a title"
            className="w-full border border-gray-300 rounded p-2 bg-white"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-medium text-white">Category</label>
          <Select
            isMulti
            options={categoriesOptions}
            value={selectedCategories}
            onChange={handleCategoriesChange}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Select Categories"
          />
          {selectedCategories.length === 0 && (
            <p className="text-red-500 text-sm">
              At least one category is required
            </p>
          )}
        </div>

        {/* Author Selection */}
        <div>
          <label className="block font-medium text-white">Author</label>
          <Select
            isMulti
            options={authorOptions}
            value={selectedAuthors}
            onChange={handleAuthorsChange}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Select author"
          />
          {selectedCategories.length === 0 && (
            <p className="text-red-500 text-sm">
              At least one author is required
            </p>
          )}
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block font-medium text-white">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setUploadedImageUrl} />
          {uploadedImageUrl === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Tags */}
        <DynamicSelectField
          label="Tags"
          placeholder="Select or add tags"
          options={tags.map((tag) => ({
            value: tag,
            label: tag,
          }))}
          defaultValue={tags} // Pass defaultValue for prefilled data
          onChange={setTags}
        />

        {/* isActive Toggle */}
        <div className="col-span-1">
          <div className="flex items-center gap-3">
            <Switch.Root
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
              className={`w-12 h-6 rounded-full relative flex items-center ${
                isFeatured ? "bg-green-500" : "bg-red-500"
              } transition-all duration-300`}
            >
              <Switch.Thumb
                className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 transform ${
                  isFeatured ? "translate-x-[1.5rem]" : "translate-x-0"
                }`}
              />
            </Switch.Root>
            <span
              className={`font-medium ${
                isFeatured ? "text-green-700" : "text-red-700"
              }`}
            >
              {isFeatured ? "Featured" : "Not Featured"}
            </span>
          </div>
        </div>
        {/* Content Editor*/}
        <div>
          <label className="block font-medium text-white ">Content</label>
          <RichTextEditor
            content={content}
            onChangeContent={handleContentChange}
          />
        </div>

        {/* Make Publish Post Button Conditional */}
        <div className="flex justify-center ">
          <Button
            type="submit"
            className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          >
            Publish Post
          </Button>
        </div>
      </form>

      {/* Preview Section */}
      {/* {content && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Preview Content
          </h2>
          <div className="border border-gray-300 p-4 md:p-8 rounded w-full max-w-full overflow-hidden">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="Uploaded Preview"
                className="w-full max-w-full h-auto object-cover mb-4 rounded"
              />
            ) : null}

            <div
              className="break-words text-white"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PublishNewPost;
