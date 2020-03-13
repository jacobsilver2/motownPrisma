const { prisma } = require("./generated/prisma-client");
const motownData = require("./largerSampleData.js");

async function main() {
  motownData.motownData.forEach(async song => {
    // console.log(song.title.title);
    const recordingsArray = [];
    song.artists.forEach(artist => {
      recordingsArray.push(artist.recordingInfo);
    });
    const newSong = await prisma.createSong({
      title: song.title.title,
      composer: song.title.composer || "",
      publisher: song.title.publisher || "",
      publishedDate: song.title.publishedDate || "",
      altTitle: song.title.altTitle || "",
      instrumental: song.title.instrumental || "",
      fromFilm: song.title.fromFilm || "",
      recordings: {
        create: recordingsArray
      }
    });

    const recordings = await prisma.song({ id: newSong.id }).recordings();

    song.artists.forEach(async artist => {
      const currentArtist = await prisma.upsertArtist({
        where: {
          name: artist.artistName
        },
        update: {
          songs: { connect: { id: newSong.id } },
          recordings: { connect: { id: recordings[0].id || null } }
        },
        create: {
          name: artist.artistName,
          songs: { connect: { id: newSong.id } },
          recordings: { connect: { id: recordings[0].id || null } }
        }
      });
      // artist.albums.forEach(async album => {
      //   console.log(album);
      //   await prisma.upsertAlbum({
      //     where: {
      //       info: album.info
      //     },
      //     update: {
      //       songs: { connect: { id: newSong.id } },
      //       artists: { connect: { id: currentArtist.id } },
      //       recordings: { connect: { id: recordings[0].id || null } }
      //     },
      //     create: {
      //       title: album.albumTitle || null,
      //       catalogNumber: album.catalogNumber,
      //       format: album.format || null,
      //       releaseDate: album.releaseDate || null,
      //       recordLabel: album.recordLabel || null,
      //       info: album.info,
      //       songs: { connect: { id: newSong.id } },
      //       artists: { connect: { id: currentArtist.id } },
      //       recordings: { connect: { id: recordings[0].id || null } }
      //     }
      //   });
      // });
    });
  });
}

main().catch(e => console.error(e));
