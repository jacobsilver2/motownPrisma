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

  const newArtist = await prisma.createArtist({
    name: "The Jackson 5"
  });
  console.log(`Created new artist: ${newArtist.name} (ID: ${newArtist.id})`);

  const newAlbumOne = await prisma.createAlbum({
    title: "ABC",
    catalogNumber: "MS709",
    recordLabel: "Motown",
    format: "LP (S)",
    releaseDate: "May-70",
    info: "May-70; LP (S): Motown MS709 ABC"
  });
  console.log(
    `Created new album: ${newAlbumOne.title} (ID: ${newAlbumOne.id})`
  );

  const newAlbumTwo = await prisma.createAlbum({
    title: "Diana Ross Presents The Jackson 5 / ABC",
    catalogNumber: "; 014 380 2",
    recordLabel: "Motown",
    format: "CD",
    releaseDate: "07-Aug-01",
    info:
      "07-Aug-01; CD: Motown 014 380 2 Diana Ross Presents The Jackson 5 / ABC"
  });
  console.log(
    `Created new album: ${newAlbumTwo.title} (ID: ${newAlbumTwo.id})`
  );

  const updatedSong = await prisma.updateSong({
    data: {
      artists: {
        connect: [{ id: newArtist.id }]
      },
      albums: {
        connect: [{ id: newAlbumOne.id }, { id: newAlbumTwo.id }]
      }
    },
    where: {
      id: newSong.id
    }
  });
  const updatedArtist = await prisma.updateArtist({
    data: {
      songs: { connect: { id: newSong.id } },
      albums: {
        connect: [{ id: newAlbumOne.id }, { id: newAlbumTwo.id }]
      }
    },
    where: {
      id: newArtist.id
    }
  });

  const updatedAlbumOne = await prisma.updateAlbum({
    data: {
      songs: {
        connect: { id: newSong.id }
      },
      artists: {
        connect: { id: newArtist.id }
      }
    },
    where: {
      id: newAlbumOne.id
    }
  });

  const updatedAlbumTwo = await prisma.updateAlbum({
    data: {
      songs: {
        connect: { id: newSong.id }
      },
      artists: {
        connect: { id: newArtist.id }
      }
    },
    where: {
      id: newAlbumTwo.id
    }
  });

  //   const updatedRecording = await prisma.updateRecording({
  //     data: {
  //       artist: {
  //         connect: { id: newArtist.id }
  //       },
  //       song: {
  //         connect: { id: newSong.id }
  //       },
  //       albums: [
  //         {
  //           connect: { id: newAlbumOne.id }
  //         },
  //         {
  //           connect: { id: newAlbumTwo.id }
  //         }
  //       ]
  //     },
  //     where: {
  //       id: newRecording.id
  //     }
  //   });
}

main().catch(e => console.error(e));
