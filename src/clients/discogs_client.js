const config = require("../config");
const axios = require("axios");
const logger = require("../lib/logger");

class DiscogsClient {
  constructor() {
    this.axios = axios;
    this.accessKey = config.discogsAccessToken;
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Discogs token=${this.accessKey}`;
  }

  /**
   * Returns the album Id for discogs API's best guess, or first result, given the params
   */
  async getAlbumId(album) {
    let albumName = album.name;
    let artistName = album.artist;
    logger.debug("getAlbumId: " + albumName + " " + artistName);
    const promise = new Promise((resolve, reject) => {
      this.axios
        .get(
          `https://api.discogs.com/database/search?q=${albumName}&type=album&artist=${artistName}`
        )
        .then((res) => {
          const topResult = res.data.results[0];
          if (topResult) {
            resolve(topResult.id);
          }
          resolve(null);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  getAlbumDetails(masterId) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`https://api.discogs.com/masters/${masterId}`)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Returns the best guess artist details from the discogs API
   */
  async getArtistDetails(artist) {
    const artistName = artist.name;
    let { data } = await this.axios.get(
      `https://api.discogs.com/database/search?q=${artistName}&type=artist`
    );
    if (data.results.length > 0) {
      return data.results[0];
    } else {
      return null;
    }
  }
}

discogs = new DiscogsClient();

module.exports = discogs;
