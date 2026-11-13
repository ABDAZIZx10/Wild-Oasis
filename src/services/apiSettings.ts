import supabase from "./supabase";
import type { Settings } from "../types";

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data as Settings;
}

export async function updateSetting(
  newSetting: Partial<Omit<Settings, "id">>
): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data as Settings;
}
