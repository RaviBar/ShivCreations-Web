"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FaArrowLeft } from "react-icons/fa";

const EditBlogPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setImage(data.image);
      } catch (err) {
        setError("Error fetching blog. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `blogs-images/${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("blogs-images")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        setError("Failed to upload image. Please try again.");
        return;
      }

      // Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from("blogs-images")
        .getPublicUrl(filePath);
      setImage(publicUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if(sessionError){
        console.log("Session error:", sessionError);
      }
      if (!session || !session.user) {
        setError("You must be logged in to update a blog.");
        return;
      }
      const authorEmail = session.user.email;

      // Send the update request to the API
      const res = await fetch(`/api/blogs`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          excerpt,
          content,
          image,
          authorEmail, // Use the logged-in user's email
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update blog");
      }

      router.push(`/blogs/${id}`); // Redirect to the updated blog's details page
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog. Please try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <button
          onClick={() => router.push("/admin")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-300 mb-4"
        >
          <FaArrowLeft className="text-gray-800 text-xl" />
          <span className="text-red-800 text-xl">Back to Admin</span>
      </button>
        <h1 className="text-2xl font-bold text-blue-800 mt-6 mb-4">Edit Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={10}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;