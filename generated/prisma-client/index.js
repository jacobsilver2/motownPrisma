"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Song",
    embedded: false
  },
  {
    name: "Artist",
    embedded: false
  },
  {
    name: "Album",
    embedded: false
  },
  {
    name: "Recording",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/jacob-silver-22a2f3/motown/dev`
});
exports.prisma = new exports.Prisma();
