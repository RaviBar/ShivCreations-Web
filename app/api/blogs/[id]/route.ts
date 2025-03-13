import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
   { params }: { params: Promise<{ id: string }> }
  ) {
  const { id } = await params;
    console.log("id:", id);
  try {
    const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
