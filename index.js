const { prisma } = require("./generated/prisma-client");

async function main() {
  const newSong = await prisma.createSong({
    title: "2-4-6-8",
    publisher: "Jobete",
    publishedDate: "18-May-70",
    composer: "Pamela Sawyer-Gloria Jones",
    recordings: {
      create: [
        {
          producer: "Hal Davis",
          location: "MoWest"
        }
      ]
    }
  });
  console.log(`Created new song: ${newSong.title} (ID: ${newSong.id})`);
  const recordings = await prisma.song({ id: newSong.id }).recordings();

  const artist = await prisma.upsertArtist({
    where: {
      name: "The Jackson 5"
    },
    update: {
      songs: { connect: { id: newSong.id } }
    },
    create: {
      name: "The Jackson 5",
      songs: { connect: { id: newSong.id } }
    }
  });

  console.log(`artist: ${artist.name} (ID: ${artist.id})`);

  const albumOne = await prisma.upsertAlbum({
    where: {
      title: "ABC"
    },
    update: {
      songs: { connect: { id: newSong.id } },
      artists: { connect: { id: artist.id } }
    },
    create: {
      title: "ABC",
      catalogNumber: "MS709",
      recordLabel: "Motown",
      format: "LP (S)",
      releaseDate: "May-70",
      info: "May-70; LP (S): Motown MS709 ABC",
      songs: { connect: { id: newSong.id } },
      artists: { connect: { id: artist.id } }
    }
  });
  console.log(`Created new album: ${albumOne.title} (ID: ${albumOne.id})`);

  const albumTwo = await prisma.upsertAlbum({
    where: {
      title: "Diana Ross Presents The Jackson 5 / ABC"
    },
    update: {
      songs: { connect: { id: newSong.id } },
      artists: { connect: { id: artist.id } }
    },
    create: {
      title: "Diana Ross Presents The Jackson 5 / ABC",
      catalogNumber: "; 014 380 2",
      recordLabel: "Motown",
      format: "CD",
      releaseDate: "07-Aug-01",
      info:
        "07-Aug-01; CD: Motown 014 380 2 Diana Ross Presents The Jackson 5 / ABC",
      songs: { connect: { id: newSong.id } },
      artists: { connect: { id: artist.id } }
    }
  });
  console.log(`Created album: ${albumTwo.title} (ID: ${albumTwo.id})`);

  // const updatedSong = await prisma.updateSong({
  //   data: {
  //     artists: {
  //       connect: [{ id: artist.id }]
  //     },
  //     albums: {
  //       connect: [{ id: newAlbumOne.id }, { id: newAlbumTwo.id }]
  //     }
  //   },
  //   where: {
  //     id: newSong.id
  //   }
  // });
  // const updatedArtist = await prisma.updateArtist({
  //   data: {
  //     songs: { connect: { id: newSong.id } },
  //     albums: {
  //       connect: [{ id: newAlbumOne.id }, { id: newAlbumTwo.id }]
  //     }
  //   },
  //   where: {
  //     id: newArtist.id
  //   }
  // });

  // const updatedAlbumOne = await prisma.updateAlbum({
  //   data: {
  //     songs: {
  //       connect: { id: newSong.id }
  //     },
  //     artists: {
  //       connect: { id: newArtist.id }
  //     }
  //   },
  //   where: {
  //     id: newAlbumOne.id
  //   }
  // });

  // const updatedAlbumTwo = await prisma.updateAlbum({
  //   data: {
  //     songs: {
  //       connect: { id: newSong.id }
  //     },
  //     artists: {
  //       connect: { id: newArtist.id }
  //     }
  //   },
  //   where: {
  //     id: newAlbumTwo.id
  //   }
  // });

  const updatedRecording = await prisma.updateRecording({
    data: {
      artist: {
        connect: { id: artist.id }
      },
      song: {
        connect: { id: newSong.id }
      },
      albums: {
        connect: [{ id: albumOne.id }, { id: albumTwo.id }]
      }
    },
    where: {
      id: recordings[0].id
    }
  });
}

main().catch(e => console.error(e));
