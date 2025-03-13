"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ExistingBlogs from "../components/ExistingBlogs";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  created_at: string;
  updated_at: string;
}

const AdminPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [liveUrl, setLiveUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
        router.push("/blogs");
        return;
      }

      // Fetch the user's role from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (profileError || profile?.role !== 'admin') {
        router.push("/blogs");
      }
    };

    checkAdmin();
  }, [router]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again.");
      }
   };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
  
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Session error:", sessionError); 
    }
    if (!session || !session.user) {
      alert("You must be logged in to delete a blog.");
      return;
    }
    const authorEmail = session.user.email;
      const res = await fetch(`/api/blogs`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, authorEmail })  
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete blog");
      }
  
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setSuccess("Blog deleted successfully!");
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete blog. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) {
        console.error("Auth error:", authError);
    }
      if (!session || !session.user ) {
        setError("Unauthorized: Only admins can create blogs");
        return;
      }
  
      if (!title || !excerpt || !content || !image) {
        setError("Title, excerpt, content, and image are required.");
        return;
      }
  
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          image,
          authorEmail: session.user.email,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create blog");
      }
  
      const newBlog = await response.json();
      setBlogs([...blogs, newBlog.data]);
      setSuccess("Blog created successfully!");
      setTitle("");
      setExcerpt("");
      setContent("");
      setImage("");
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
        setError("Failed to log out. Please try again.");
      } else {
        router.push("/blogs");
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err);
      setError("Failed to log out. Please try again.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `blogs-images/${fileName}`;
  
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
        setError("You must be logged in to upload images.");
        return;
      }
  
      const { error: uploadError } = await supabase.storage
        .from("blogs-images")
        .upload(filePath, file, { upsert: false });
  
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        setError(`Failed to upload image: ${uploadError.message}`);
        return;
      }
      
  
      const { data: { publicUrl } } = supabase.storage.from("blogs-images").getPublicUrl(filePath);
      setImage(publicUrl);
      setSuccess("Image uploaded successfully!");
    }
  };

  const fetchLiveUrl = async () => {
    try {
      const { data, error } = await supabase
        .from("live_url")
        .select("url")
        .eq("id", 1)
        .single(); 

      if (error) throw error;
      setLiveUrl(data?.url || "");
    } catch (error) {
      console.error("Error fetching live URL:", error);
      setError("Failed to fetch live URL.");
    }
  };

  // Update the live URL
  const handleUpdateLiveUrl = async () => {
    if (!liveUrl) {
      alert("Please enter a live URL.");
      return;
    }

    try {
      // Upsert (update or insert) the live URL
      const { error } = await supabase
        .from("live_url")
        .update({ url: liveUrl })
      .eq("id", 1); 

      if (error) throw error;

      setSuccess("Live URL updated successfully!");
      fetchLiveUrl(); 
    } catch (error) {
      console.error("Error updating live URL:", error);
      setError("Failed to update live URL.");
    }
  };

  useEffect(() => {
    fetchLiveUrl();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
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
              rows={5}
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
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Create Blog
          </button>
        </form>
        <div className="flex flex-col mt-8 space-y-4 max-w-md">
          <p>Update latest Url</p>
  <input
    type="text"
    placeholder="Enter live URL"
    value={liveUrl}
    onChange={(e) => setLiveUrl(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
  />
  <button
  onClick={handleUpdateLiveUrl}
  className="w-32 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
>
  Update
</button>
</div>
        <ExistingBlogs blogs={blogs} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminPage;