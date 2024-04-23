const anilistUrl = await getAnilistUrl(malId);
const lastPart = anilistUrl.split('/').pop();
entry.id = lastPart;

//--------------------
//        mal to ani
//--------------------
async function getAnilistUrl(malId) {
  const query = `query($id: Int, $type: MediaType){Media(idMal: $id, type: $type){siteUrl}}`;
  const data = JSON.stringify({
    query,
    variables: { id: malId, type: "ANIME" }
  });

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    });

    const responseData = await response.json();
    return responseData.data.Media.siteUrl || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
