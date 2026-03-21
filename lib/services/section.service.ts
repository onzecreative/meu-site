import { supabase } from "../supabase";

export async function getSectionData<T>(id: string, defaultData: T): Promise<T> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", id)
      .single();

    if (error || !data) {
      return defaultData;
    }
    return { ...defaultData, ...(data.data as Partial<T>) };
  } catch {
    return defaultData;
  }
}

export async function saveSectionData<T>(id: string, payload: Partial<T>): Promise<T> {
  const current = await getSectionData<T>(id, {} as T);
  const updated = { ...current, ...payload };
  
  const { error } = await supabase
    .from("site_content")
    .upsert({ id, data: updated, updated_at: new Date().toISOString() });
    
  if (error) throw error;
    
  return updated as T;
}
