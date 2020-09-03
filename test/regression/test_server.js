const axios = require("axios");
const assert = require("assert");
const { nullArtist, nullAlbum } = require("../../models/null_responses");
const { Album } = require("../../models/models");
const instance = axios.create({
  baseURL: "http://localhost:5000",
});

describe("Test Server Endpoints", () => {
  it("/artists", async () => {
    const res = await instance.get("/artists");
    const artistObjs = Object.keys(res.data);
    const oneArtist = res.data[0];

    assert.equal(res.status, 200);
    assert(artistObjs.length > 0);
    assert.deepEqual(Object.keys(oneArtist.details), Object.keys(nullArtist));
  });
  it("/albums", async () => {
    const res = await instance.get("/artists/John Coltrane/albums");
    const albums = res.data;
    const oneAlbum = res.data[0];

    assert(oneAlbum != false);
    assert.equal(res.status, 200);
    assert(albums.length > 0);
    assert.equal(oneAlbum.artist, "John Coltrane");
    assert.deepEqual(oneAlbum.details, nullAlbum);
  });
  it("/songs", async () => {
    const res = await instance.get(
      "/artists/John Coltrane/albums/A Love Supreme/songs"
    );
    const songs = res.data;
    assert.equal(songs, "");
  });
});
