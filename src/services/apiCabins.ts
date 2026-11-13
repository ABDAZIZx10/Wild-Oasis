import supabase, { supabaseUrl } from "./supabase";
import type { Cabin, NewCabin } from "../types";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as Cabin[];
}

export async function createEditCabin(
  newCabin: NewCabin,
  id?: number
): Promise<Cabin> {
  const imageValue = newCabin.image;
  const hasImagePath =
    typeof imageValue === "string" && imageValue.startsWith(supabaseUrl);

  const imageName =
    typeof imageValue !== "string"
      ? `${Math.random()}-${imageValue.name}`.replaceAll("/", "")
      : "";

  const imagePath = hasImagePath
    ? (imageValue as string)
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // A) CREATE
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let finalQuery: any = query;
  if (!id) finalQuery = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id)
    finalQuery = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await finalQuery.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data as Cabin;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageValue as File);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data as Cabin;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
