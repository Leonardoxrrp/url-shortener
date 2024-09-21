import supabase from "./supabase"

export async function getClicksForUrls(urlIds) {
    const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds)

    if (error) throw new Error("Unable to load URLs")
    
    return data
}
