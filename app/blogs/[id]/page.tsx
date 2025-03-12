'use client';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

// Function to format the blog content
const formatContent = (content: string) => {
  return content.split("\n\n").map((paragraph, index) => {
    if (paragraph.startsWith("### ")) {
      return (
        <h3 key={index} className="text-2xl font-bold text-gray-800 mt-4">
          {paragraph.replace("### ", "")}
        </h3>
      );
    } else if (paragraph.startsWith("## ")) {
      return (
        <h2 key={index} className="text-3xl font-extrabold text-gray-900 mt-6">
          {paragraph.replace("## ", "")}
        </h2>
      );
    } else if (paragraph.startsWith("# ")) {
      return (
        <h1 key={index} className="text-4xl font-black text-gray-950 mt-8">
          {paragraph.replace("# ", "")}
        </h1>
      );
    } else if (paragraph.startsWith("- ")) {
      return (
        <ul key={index} className="list-disc list-inside my-2 pl-5">
          {paragraph.split("\n").map((item, i) => (
            <li key={i} className="text-lg">{item.replace("- ", "")}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <p key={index} className="text-gray-700 leading-relaxed mt-2 text-lg">
          {paragraph}
        </p>
      );
    }
  });
};

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError("Error fetching blog. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      <div className="max-w-4xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
      <button 
        onClick={() => router.push('/blogs')} 
        className="flex items-center space-x-2 text-blue-700 hover:text-gray-900 font-semibold text-lg p-4"
      >
        <FaArrowLeft className="text-xl" />
      </button>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">{blog.title}</h1>
        </div>
        <div className="prose text-lg lg:prose-xl max-w-none p-6">
          {formatContent(blog.content)}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
