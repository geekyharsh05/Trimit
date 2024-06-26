import supabase, { supabaseUrl } from "./supabase";
import generateShortUrl from "@/utils/generateShortURL";

export async function getUrls(user_id) {
  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
}

export async function getLongUrl(id) {
  let { data: shortLinkData, error: shortLinkError } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (shortLinkError && shortLinkError.code !== "PGRST116") {
    console.error("Error fetching short link:", shortLinkError);
    return;
  }

  return shortLinkData;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  try {
    const short_url = generateShortUrl();
    const fileName = `qr-${short_url}`;

    // Upload QR code to Supabase storage
    const { error: storageError } = await supabase.storage
      .from("qrs")
      .upload(fileName, qrcode);
    if (storageError) {
      throw new Error(storageError.message);
    }

    // Construct the public URL for the uploaded QR code
    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    // Insert the URL data into Supabase
    const { data, error } = await supabase
      .from("urls")
      .insert([
        {
          title,
          user_id,
          original_url: longUrl,
          custom_url: customUrl || null,
          short_url,
          qr,
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to create short URL");
  }
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete Url");
  }

  return data;
}
