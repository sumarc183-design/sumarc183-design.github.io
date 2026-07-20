import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = new URL(".", import.meta.url).pathname;
const dist = join(root, "dist");

const assets = [
  ["index.html", "text/html; charset=utf-8"],
  ["styles.css", "text/css; charset=utf-8"],
  ["script.js", "application/javascript; charset=utf-8"],
  ["assets/hero-data-portfolio.jpg", "image/jpeg"],
  ["assets/marc-su-portrait.jpg", "image/jpeg"],
  ["assets/favicon.png", "image/png"],
  ["assets/favicon-32.png", "image/png"],
  ["assets/CV_data_Marc_Su.pdf", "application/pdf"],
  ["assets/CV_finance_Marc_Su.pdf", "application/pdf"],
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "server"), { recursive: true });
await mkdir(join(dist, ".openai"), { recursive: true });

const embedded = {};
for (const [file, contentType] of assets) {
  const data = await readFile(join(root, file));
  embedded[`/${file}`] = {
    contentType,
    body: data.toString("base64"),
  };
}
embedded["/"] = embedded["/index.html"];

const worker = `const ASSETS = ${JSON.stringify(embedded)};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname.endsWith("/") && url.pathname !== "/" ? url.pathname.slice(0, -1) : url.pathname;
    const asset = ASSETS[pathname] || ASSETS["/"];
    const headers = {
      "content-type": asset.contentType,
      "cache-control": pathname.includes("/assets/") ? "public, max-age=31536000, immutable" : "public, max-age=300",
    };
    return new Response(decodeBase64(asset.body), { headers });
  },
};
`;

await writeFile(join(dist, "server", "index.js"), worker);
await writeFile(
  join(dist, ".openai", "hosting.json"),
  await readFile(join(root, ".openai", "hosting.json"))
);

console.log(`Built ${assets.length} assets into ${join(dist, "server", "index.js")}`);
