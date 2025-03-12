import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Fetch all blogs
export async function GET() {
  try {
    const { data, error } = await supabase.from("blogs").select("*");

    if (error) {
      console.error("Error fetching blogs:", error.message);
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Create a new blog
export async function POST(req: Request) {
  try {
    const { title, excerpt, image, content, authorEmail } = await req.json();

    // Validate request body
    if (!title || !content || !excerpt || !image || !authorEmail) {
      return NextResponse.json(
        { error: "Title, excerpt, content, image, and authorEmail are required" },
        { status: 400 }
      );
    }

    // Fetch the user's role from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("email", authorEmail)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching user profile:", profileError?.message);
      return NextResponse.json({ error: "Failed to verify user role" }, { status: 500 });
    }

    // Check if the user is an admin
    if (profile.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Only admins can create blogs" }, { status: 403 });
    }

    // Insert the new blog into the database
    const { data, error } = await supabase
      .from("blogs")
      .insert([{ title, excerpt, content, image, author: authorEmail }])
      .select();

    if (error) {
      console.error("Error creating blog:", error.message);
      return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }

    // Return the created blog and a redirect URL
    return NextResponse.json(
      { data, redirectUrl: "/blogs" }, // Redirect URL after successful creation
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete an existing blog
export async function DELETE(req: Request) {
  try {
    const { id, authorEmail } = await req.json();

    if (!id || !authorEmail) {
      return NextResponse.json({ error: "ID and authorEmail are required" }, { status: 400 });
    }

    // Fetch the user's role from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("email", authorEmail)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching user profile:", profileError?.message);
      return NextResponse.json({ error: "Failed to verify user role" }, { status: 500 });
    }

    // Check if the user is an admin
    if (profile.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Only admins can delete blogs" }, { status: 403 });
    }

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      console.error("Error deleting blog:", error.message);
      return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Update an existing blog
export async function PUT(req: Request) {
  try {
    const { id, title, excerpt, content, image, authorEmail } = await req.json();

    // Validate request body
    if (!id || !title || !excerpt || !content || !image || !authorEmail) {
      return NextResponse.json(
        { error: "ID, title, excerpt, content, image, and authorEmail are required" },
        { status: 400 }
      );
    }

    // Fetch the user's role from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("email", authorEmail)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching user profile:", profileError?.message);
      return NextResponse.json({ error: "Failed to verify user role" }, { status: 500 });
    }

    // Check if the user is an admin
    if (profile.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Only admins can update blogs" }, { status: 403 });
    }

    // Update the blog in the database
    const { data, error } = await supabase
      .from("blogs")
      .update({ title, content, excerpt, image, author: authorEmail })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating blog:", error.message);
      return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }

    // Return the updated blog and a redirect URL
    return NextResponse.json(
      { data, redirectUrl: `/blogs/${id}` }, // Redirect to the updated blog's details page
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}