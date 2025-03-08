/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Select from "react-select";
import { toast } from "sonner";
import { ICategoryOption, IAuthor } from "./post.type";
import * as Switch from "@radix-ui/react-switch";
import axiosInstance from "@/api/axiosInstance";

const PostEditModal = ({ isOpen, onClose, post, onPostUpdate }: any) => {
  const [title, setTitle] = useState(post.title || "");
  const [body, setBody] = useState(post.content || "");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(post.imgUrl || "");
  const [isFeatured, setIsFeatured] = useState(post.isFeatured || false);
  const [tags, setTags] = useState<string[]>(post.tags || []);

  // Category and Author state (Single Selection)
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryOption | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<ICategoryOption[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor | null>(null);
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
        setCategoryOptions(formattedCategories);
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  // Fetch authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axiosInstance.get("/author");
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

  // Pre-fill selected category and author from the post
  useEffect(() => {
    if (post) {
      setSelectedCategory(
        post.category ? { value: post.category, label: post.category } : null
      );
      setSelectedAuthor(
        post.author ? { value: post.author, label: post.author } : null
      );
    }
    setTitle(post.title || "");
    setBody(post.content || "");
    setUploadedImageUrl(post.coverImage || "");
  }, [post]);

  // Handle category change
  const handleCategoryChange = (selectedOption: ICategoryOption | null) => {
    setSelectedCategory(selectedOption);
  };

  // Handle author change
  const handleAuthorChange = (selectedOption: IAuthor | null) => {
    setSelectedAuthor(selectedOption);
  };

  // Handle content change from editor
  const handleContentChange = (newContent: any) => {
    setBody(newContent);
  };

  const handleUpdate = async () => {
    const updatedPostData = {
      title,
      body,
      image: uploadedImageUrl,
      category: selectedCategory?.value || "",
      author: selectedAuthor?.value || "",
      isFeatured,
      tags,
    };
    try {
      await axiosInstance.patch(`/posts/${post._id}`, updatedPostData);
      Swal.fire("Success!", "Post updated successfully.", "success");
      onPostUpdate();
      onClose();
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
          <label className="block text-sm font-medium mb-1">Title</label>
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
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="basic-single text-black"
            classNamePrefix="select"
            placeholder="Select Category"
          />
        </div>

        {/* Author Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <Select
            options={authorOptions}
            value={selectedAuthor}
            onChange={handleAuthorChange}
            className="basic-single text-black"
            classNamePrefix="select"
            placeholder="Select Author"
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

        {/* Confirmation Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
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
