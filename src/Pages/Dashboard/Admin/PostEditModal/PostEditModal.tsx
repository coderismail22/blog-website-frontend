/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Select, { MultiValue } from "react-select";
import { toast } from "sonner";
import { ICategoryOption, IAuthor } from "./post.type"; // Assuming you already have types for these
import * as Switch from "@radix-ui/react-switch";
import axiosInstance from "@/api/axiosInstance";

const PostEditModal = ({ isOpen, onClose, post, onPostUpdate }: any) => {
  const [title, setTitle] = useState(post.title || "");
  const [body, setBody] = useState(post.content || "");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(post.imgUrl || "");
  const [isFeatured, setIsFeatured] = useState(post.isFeatured || false);
  const [tags, setTags] = useState<string[]>(post.tags || []);

  // Categories and authors state
  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<ICategoryOption>
  >([]);
  const [categoriesOptions, setCategoriesOptions] = useState<ICategoryOption[]>(
    []
  );
  const [selectedAuthors, setSelectedAuthors] = useState<MultiValue<IAuthor>>(
    []
  );
  const [authorOptions, setAuthorOptions] = useState<IAuthor[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/categories");
        const formattedCategories = data?.data?.map((category: any) => ({
          value: category.name,
          label: category.name,
        }));
        setCategoriesOptions(formattedCategories);
        console.log(formattedCategories);
      } catch (error) {
        toast.error("Error fetching categories:");
      }
    };
    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoriesChange = (
    selectedOptions: MultiValue<ICategoryOption>
  ) => {
    setSelectedCategories(selectedOptions || []);
  };

  // Fetch authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get("/author");
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

  // Handle author change
  const handleAuthorsChange = (selectedOptions: MultiValue<IAuthor>) => {
    setSelectedAuthors(selectedOptions || []);
  };

  //child to parent state lifting
  const handleContentChange = (newContent: any) => {
    setBody(newContent); // Update the state in the parent
  };

  useEffect(() => {
    if (post) {
      // Ensure preselected values are in the correct format
      setSelectedCategories(
        post.category?.map((cat: string) => ({
          value: cat,
          label: cat,
        })) || []
      );
    }
    setTitle(post.title || "");
    setBody(post.content || "");
    setUploadedImageUrl(post.coverImage || "");
  }, [post]);

  const handleUpdate = async () => {
    const updatedPostData = {
      title,
      body,
      image: uploadedImageUrl,
    };
    try {
      // TODO: Add Server Url
      await axiosInstance.patch(`/posts/${post._id}`, updatedPostData);
      Swal.fire("Success!", "Post updated successfully.", "success");
      onPostUpdate();
      onClose(); // Close the modal
    } catch (error) {
      Swal.fire("Error!", "Failed to update post.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 ">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select
            isMulti
            options={categoriesOptions}
            value={selectedCategories}
            onChange={handleCategoriesChange}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Select Categories"
          />
        </div>

        {/* Author Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <Select
            isMulti
            options={authorOptions}
            value={selectedAuthors}
            onChange={handleAuthorsChange}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Select author"
          />
        </div>

        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setUploadedImageUrl} />
          {uploadedImageUrl === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          {/* Implement Dynamic Select for Tags similar to PublishNewPost */}
        </div>

        {/* Featured Toggle */}
        <div className="mb-4 flex items-center gap-3">
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

        {/* Content Editor */}
        <div>
          <label className="block font-medium">Content</label>
          <RichTextEditor
            content={body}
            onChangeContent={handleContentChange}
          />
        </div>

        {/* Confirmation Button */}
        <div className="flex justify-end space-x-4">
          {/* Save Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleUpdate()}
          >
            Save Changes
          </button>
          {/* Cancel Button */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditModal;
