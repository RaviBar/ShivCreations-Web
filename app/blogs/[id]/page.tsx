'use client';
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import HeaderOnSlider from "@/app/components/HeaderOnSlider";
interface Blog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  created_at: string;
  updated_at: string;
  content: string;
}
// Function to format the blog content
const formatContent = (content: string) => {
  return content.split("\n\n").map((paragraph, index) => {
      
    if (paragraph.startsWith("### ")) {
      return (
        <h3 key={index} className="text-2xl font-bold mt-4">
          {paragraph.replace("### ", "")}
        </h3>
      );
    } else if (paragraph.startsWith("## ")) {
      return (
        <h2 key={index} className="text-3xl font-extrabold text-white mt-6">
          {paragraph.replace("## ", "")}
        </h2>
      );
    } else if (paragraph.startsWith("# ")) {
      return (
        <h1 key={index} className="text-4xl font-black text-white mt-8">
          {paragraph.replace("# ", "")}
        </h1>
      );
    } else if (paragraph.startsWith("- ")) {
      return (
        <ul key={index} className="list-disc list-inside my-2 pl-5">
          {paragraph.split("\n").map((item, i) => (
            <li key={i} className="text-xl text-[#E2A240]">{item.replace("- ", "")}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <p key={index} className="text-white leading-relaxed mt-3 text-lg">
          {paragraph}
        </p>
      );
    }

  });
};

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
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
    <div className="min-h-screen bg-gray-100 text-gray-900 py-2">
  <HeaderOnSlider />
      <div className="max-w-none mx-auto bg-white shadow-md overflow-hidden">
      <button 
        onClick={() => router.push('/blogs')} 
        className="flex items-center space-x-2 text-blue-700 hover:text-gray-900 font-semibold text-lg p-4"
      >
        <FaArrowLeft className="text-2xl hover:shadow-md" />
      </button>
      <div className="flex flex-col md:flex-row gap-6">
      {/* Blog Image */}
      <div className="w-full md:w-1/2">
        <Image
          src={blog.image}
          alt={blog.title}
          width={600}
          height={500}
          className="object-cover w-full h-auto shadow"
        />
      </div>

      {/* Blog Title & Excerpt */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h1 className="text-5xl font-bold text-[#E2A240]">{blog.title}</h1>
        <p className="text-lg font-semibold text-gray-700 mt-2">{blog.excerpt}</p>
      </div>
    </div>
    <div className="prose text-lg bg-black text-white font-serif shadow-md p-6 lg:prose-xl max-w-none">
      {formatContent(blog.content)}
</div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
