function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeSongName(songTarget) {
  let songName = songTarget;

  // (\.[A-z]{2,4}\d\b) # Matches extensions
  const numberRegEx = songName.match(/(?<=\b)\d+ (?=)/g);
  const fileExtensionRegEx = songName.match(/\.[A-z,\d*\b]{2,4}/g);
  const fraction = songName.match(/\d{1,2}_\d{1,2}/g);

  if (numberRegEx) {
    songName = songName.replace(numberRegEx, "");
  }

  if (fileExtensionRegEx) {
    songName = songName.replace(fileExtensionRegEx, "");
  }

  if (fraction) {
    const replacement = fraction[0].replace("_", "/");
    songName = songName.replace(fraction, replacement);
  }

  return songName;
}

/**
 * Normalizes the artist name string for more reliability in our caching file structure
 * @param {string} artistName The name of an artist as seen in s3
 */
function normalizeArtistName(artistName) {
  return artistName.replace(/ /g, "-").replace(/\//g, "");
}
module.exports = { sleep, normalizeSongName, normalizeArtistName };
