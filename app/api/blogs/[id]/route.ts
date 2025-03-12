import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
