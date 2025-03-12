"use client";
import { useRouter } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
}

interface ExistingBlogsProps {
  blogs: Blog[];
  onDelete: (id: number) => void;
}

const ExistingBlogs: React.FC<ExistingBlogsProps> = ({ blogs, onDelete }) => {
  const router = useRouter();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Existing Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
          <p className="text-gray-700">{blog.excerpt}</p>
          <div className="mt-2">
            <button
              onClick={() => router.push(`/blogs/${blog.id}/edit`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition-all duration-300 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExistingBlogs;