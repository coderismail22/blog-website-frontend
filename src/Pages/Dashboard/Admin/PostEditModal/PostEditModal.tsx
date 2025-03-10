/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Select from "react-select";
import { toast } from "sonner";
import { ICategoryOption, IAuthor } from "./post.type";
import * as Switch from "@radix-ui/react-switch";
import axiosInstance from "@/api/axiosInstance";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const PostEditModal = ({ isOpen, onClose, post, onPostUpdate }: any) => {
  const [title, setTitle] = useState(post.title || "");
  const [body, setBody] = useState(post.content || "");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(post.imgUrl || "");
  const [isFeatured, setIsFeatured] = useState(post.isFeatured || false);
  const [tags, setTags] = useState<string[]>(post.tags || []);
  const user = useSelector((state: RootState) => state.auth.user);

  // Related and Sidebar Post Selection
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]); // All posts to populate the dropdown
  const [sidebarPosts, setSidebarPosts] = useState<any[]>([]); // All posts to populate the dropdown
  const [selectedRelatedPosts, setSelectedRelatedPosts] = useState<any[]>(
    post.relatedPosts || []
  );
  const [selectedSidebarPosts, setSelectedSidebarPosts] = useState<any[]>(
    post.sidebarPosts || []
  );
  // Category and Author state (Single Selection)
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryOption | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<ICategoryOption[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor | null>(null);
  // const [authorOptions, setAuthorOptions] = useState<IAuthor[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/categories");
        const formattedCategories = data?.data?.map((category: any) => ({
          value: category._id,
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
  // useEffect(() => {
  //   const fetchAuthors = async () => {
  //     try {
  //       const { data } = await axiosInstance.get("/author");
  //       const formattedAuthors = data?.data?.map((author: any) => ({
  //         value: author._id,
  //         label: author.name,
  //       }));
  //       setAuthorOptions(formattedAuthors);
  //     } catch (error) {
  //       toast.error("Error fetching authors");
  //     }
  //   };
  //   fetchAuthors();
  // }, []);

  // Pre-fill selected category and author from the post
  useEffect(() => {
    if (post) {
      // Set selected category using the category _id and label from categoryOptions
      setSelectedCategory(
        post.category
          ? categoryOptions.find((cat) => cat.value === post.category._id) ||
              null
          : null
      );
      // Set selected author using the author _id
      setSelectedAuthor(post.author ? { value: post.author._id } : null);
      // Set selected tags using the tags
      setTags(post.tags || []);
    }
    setTitle(post.title || "");
    setBody(post.content || "");
    setUploadedImageUrl(post.coverImage || "");
    // Set selected related posts (ensure they are in the same format as options)
    setSelectedRelatedPosts(
      post.relatedPosts?.map((relatedPost: any) => ({
        value: relatedPost._id,
        label: relatedPost.title,
      })) || []
    );
    // Set selected sidebar posts (ensure they are in the same format as options)
    setSelectedSidebarPosts(
      post.sidebarPosts?.map((sidebarPost: any) => ({
        value: sidebarPost._id,
        label: sidebarPost.title,
      })) || []
    );
  }, [post, categoryOptions]);

  // Fetch all posts (for related and sidebar posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get("/posts");
        const formattedPosts = data?.data?.map((post: any) => ({
          value: post._id,
          label: post.title,
        }));
        setRelatedPosts(formattedPosts);
        setSidebarPosts(formattedPosts);
      } catch (error) {
        toast.error("Error fetching posts");
      }
    };
    fetchPosts();
  }, []);

  // Handle category change
  const handleCategoryChange = (selectedOption: ICategoryOption | null) => {
    setSelectedCategory(selectedOption);
  };

  // Handle author change
  // const handleAuthorChange = (selectedOption: IAuthor | null) => {
  //   setSelectedAuthor(selectedOption);
  // };

  // Handle content change from editor
  const handleContentChange = (newContent: any) => {
    setBody(newContent);
  };

  // Handle related posts change
  const handleRelatedPostsChange = (selectedOptions: any) => {
    setSelectedRelatedPosts(selectedOptions);
  };

  // Handle sidebar posts change
  const handleSidebarPostsChange = (selectedOptions: any) => {
    setSelectedSidebarPosts(selectedOptions);
  };
  const handleUpdate = async () => {
    const updatedPostData = {
      title,
      content: body,
      coverImage: uploadedImageUrl,
      category: selectedCategory?.value || "",
      author: selectedAuthor?.value || user?.userId,
      isFeatured,
      tags,
      relatedPosts: selectedRelatedPosts.map((post) => post.value),
      sidebarPosts: selectedSidebarPosts.map((post) => post.value),
    };
    console.log(updatedPostData);
    try {
      await axiosInstance.patch(`/posts/${post._id}`, updatedPostData);
      Swal.fire("Success!", "Post updated successfully.", "success");
      onPostUpdate();
      onClose();
    } catch (error) {
      console.log(error);
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
        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <Select
            options={authorOptions}
            value={selectedAuthor}
            onChange={handleAuthorChange}
            className="basic-single text-black"
            classNamePrefix="select"
            placeholder="Select Author"
          />
        </div> */}
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
        {/*  Related Posts Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Related Posts
          </label>
          <Select
            isMulti
            options={relatedPosts} // Use the state for options
            value={selectedRelatedPosts} // Prefilled with selected posts
            onChange={handleRelatedPostsChange}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Select Related Posts"
          />
        </div>
        {/*  Sidebar Posts Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Sidebar Posts
          </label>
          <Select
            isMulti
            options={sidebarPosts} // Use the state for options
            value={selectedSidebarPosts} // Prefilled with selected posts
            onChange={handleSidebarPostsChange}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Select Sidebar Posts"
          />
        </div>
        {/* Tags Selection */}
        <div className="mb-4">
          <DynamicSelectField
            label="Tags"
            placeholder="Select or add tags"
            options={tags.map((tag) => ({
              value: tag,
              label: tag,
            }))}
            defaultValue={tags} // Ensure tags are prefilled
            onChange={setTags}
          />
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
