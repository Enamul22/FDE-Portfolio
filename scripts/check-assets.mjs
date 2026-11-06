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
