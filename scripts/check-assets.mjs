import sharp from "sharp";
import { projects } from "../content/projects.ts";
import { imageDimensions } from "../content/images.ts";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
async function files(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory()
          ? files(path.join(dir, e.name))
          : [path.join(dir, e.name)],
      ),
    )
  ).flat();
}
const publicFiles = await files("public");
for (const f of publicFiles)
  if (
    /\.pdf$|(?:^|[\/_-])(?:resume|review)(?:[\/_.-]|$)|master.prompt|planning.notes/i.test(
      f,
    )
  )
    throw Error(`Unexpected public asset: ${f}`);
const profile = await readFile("content/profile.ts", "utf8");
if (!/showCvDownload:\s*false/.test(profile) || !/cvUrl:\s*null/.test(profile))
  throw Error("Expected current CV settings to stay disabled.");
console.log(
  `Public assets checked: ${publicFiles.length}; CV download disabled.`,
);

for (const project of projects) {
  const images = [
    { src: project.image, alt: project.imageAlt },
    ...project.gallery,
  ];
  for (const image of images) {
    if (!image.alt.trim()) throw Error(`Missing image alt text: ${image.src}`);
    const expected = imageDimensions[image.src];
    if (!expected) throw Error(`Missing image dimensions: ${image.src}`);
    const actual = await sharp(path.join("public", image.src)).metadata();
    if (actual.width !== expected.width || actual.height !== expected.height)
      throw Error(`Image dimensions differ: ${image.src}`);
  }
  const live = new URL(project.live);
  if (live.protocol !== "https:" || live.search || live.hash)
    throw Error(`Expected a clean HTTPS live URL: ${project.slug}`);
}
console.log(
  `Project images and live URL shapes checked for ${projects.length} projects.`,
);
