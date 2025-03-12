"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import HeaderOnSlider from '@/app/components/HeaderOnSlider';

const HomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <HeaderOnSlider />

      {/* Blog List */}
      <div className="max-w-4xl mx-auto mt-16 p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#E2A240]">All Blogs</h2>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/blogs/${blog.id}`)} 
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{blog.title}</h3>
                  <p className="text-gray-700 line-clamp-3">{blog.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default HomePage;