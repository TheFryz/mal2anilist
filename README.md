# mal2anilist
This is a simple lib to convert myanimelist id's to a anilist url.

I made this into a javascript format from the php formated made by janvernieuwe
> [Github Repo](https://github.com/janvernieuwe/mal2anilist)

## Installation

```javascript
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
```

## Usage

```javascript
let malId = '37430';
const anilistUrl = await getAnilistUrl(malId); // $anilistUrl is now https://anilist.co/anime/101280
const lastPart = anilistUrl.split('/').pop(); 
entry.id = lastPart; // $anilistUrl is now 101280
```

When it cannot be found, null is returned.
