import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { greenmanGallery } from "../src/data/greenmanGallery";

// SHA-256 hashes from the user-supplied asset package. These prove copies are
// unchanged, including the creator/player marks baked into the original frames.
const sourceHashes: Record<string, string> = {
  "GM_01_active-sprinklers-residential.jpg":
    "b1b4ab7322909604746cf62336a0afdfa91dd899d9c27554829589dc49e5dc1d",
  "GM_01_active-sprinklers-residential.webp":
    "414253ec561ee753f07ffce582e298627c9cb358755f8ec427a28bac9102e367",
  "GM_01_residential-estate-green-lawn.jpg":
    "15dadc4635975e8fb1a477e9edb89213b00dfe95aca150b06d58598bda49670e",
  "GM_01_residential-estate-green-lawn.webp":
    "3a61b021c8ffbde038fd69601b9e2cb38c50a76134f9d9da20a22e7a94599185",
  "GM_01_residential-lawn-sprinkler.jpg":
    "cae03fec5c11840adf45aaf964cc07229f41db2cdab8754722e59e2b6f1e69fb",
  "GM_01_residential-lawn-sprinkler.webp":
    "2054684077829402904c0f50ee54df90d34f971de36550afee4200c8a80ee972",
  "GM_02_water-system-parking-area.jpg":
    "9666cdc329d0fdc45e66978b4a70a401f965e38ccac38531f3298a8f3099cb82",
  "GM_02_water-system-parking-area.webp":
    "d3c9e6827f330b2e9dc51f62878bbcd61661e0aa3255b3036428f4e9d4a6450b",
  "GM_02_work-vehicle-and-water.jpg":
    "7f2ff04d02fb1f154b092fa3a874472457da78794adbdadb0fc330d031f5428b",
  "GM_02_work-vehicle-and-water.webp":
    "c67223bf75239313beabb759b728b32e1b863b8ca6f0ff5d2a47e9469474bb14",
  "GM_03_garden-irrigation-watering.jpg":
    "6d8f54eb6978af992e5f51619049443ec9960dd465b934c556f7e7e3454c1764",
  "GM_03_garden-irrigation-watering.webp":
    "345c7d402ef784db7594af701e15e50bdcb2989360c35e4cec654ff1898e85a0",
  "GM_03_landscape-garden-beds.jpg":
    "8ee417bcb80c4df1dd6fa1cd9e4e2e4c4e465b90f6bc05cbb682ea9c0e287ced",
  "GM_03_landscape-garden-beds.webp":
    "a543c8ee68fc36b787caa2730b3053601276e61ac32182b1df732eadc57e78b0",
  "GM_03_lawn-edge-watering.jpg":
    "e1eefe9c382f3745bf2184ea349cd49c540c7e71e97f139600337646cfeecd1f",
  "GM_03_lawn-edge-watering.webp":
    "32d2181a180f1cb49bc9525fb898cd87b39651322d6004c5244d6546ecf05065",
  "GM_04_equipment-trailer-evening.jpg":
    "9150084f23480d17f7e89bf7798541a2e5147f3e203d9c22e9a95ef86a7a25d9",
  "GM_04_equipment-trailer-evening.webp":
    "77efce61a0370b1f2a41d0dac0b713b521bc0443f7786406da0e8d557df00856",
  "GM_05_finished-property-landscape.jpg":
    "4f8a66e528d92ce2790bbc32573f05611a538044e32e8d4cedf6c8f5291f939f",
  "GM_05_finished-property-landscape.webp":
    "537a462e77122976b367ba30850f50c0fc1209753c54c6f60413102e2618d4ed",
  "GM_05_landscape-rock-garden.jpg":
    "cd4ae665fac4a9d156f646b2067fd1f9289a5a3cbd2a4d9cbdaf46604b7c6f82",
  "GM_05_landscape-rock-garden.webp":
    "bd7f3c93298feb199c6217433f12d369a4db7b1bba0bf0a006f1e6bff0a344ba",
  "GM_05_rooftop-green-surface.jpg":
    "7150d5f15d615c58ac2eaa49d0ebcc43875bef89ab854010d046eb7a123a460e",
  "GM_05_rooftop-green-surface.webp":
    "20171261c345737853e7cf8c728631580662b82e006135ef5089f3ba76eeafbd",
  "GM_05_rooftop-landscape-team.jpg":
    "fbd5970df5177f1fd09e7054bd218cd2a5e819ece25f84cbaf25ecc8506daf21",
  "GM_05_rooftop-landscape-team.webp":
    "4470f215f81aa1aaa4715c7a060fc6f735bd4b6ffe8ca9be24ae4b3e88b0b32e",
  "GM_05_stone-and-plant-border.jpg":
    "f6dc3545cac1dfa433dd10c61e10860ef4370ef3dfec45de1e21652b2d370d5b",
  "GM_05_stone-and-plant-border.webp":
    "bd22af4fab08b6da7ff1c4b6c73136b4d34ee93580cbc9bc4c91f8be18fa624b",
  "GM_06_crew-construction-materials.jpg":
    "ebe9b31cfb5bebdc4871e165ce5fe80d8d8bbd805af9e6feacdf32e3109f23a1",
  "GM_06_crew-construction-materials.webp":
    "db945e14f041077fa501c37cf7688bb8773ea68ce98919ee0e1b5c72a2be5ebc",
  "GM_06_residential-yard-preparation.jpg":
    "d73149ba60f6456229fed16ea9e1245bf5ac3e1caa0884b7c5a9b9e70d222c58",
  "GM_06_residential-yard-preparation.webp":
    "ddba30625d5acf969abbb20df700e936b8bf86a161ea2559b1c39c568e3bd1ed",
  "GM_07_new-home-ground-prep.jpg":
    "c27e4450ea86c1c31cb0d40005fa943169b3d1565b884434deb50e9cdd17f02a",
  "GM_07_new-home-ground-prep.webp":
    "76000336a3c658f5ca1a92c124e22994702703c7934b1a51a283f8681d882091",
  "GM_07_residential-project-wide.jpg":
    "31c6e3f11deb5ecf50ca2f8340681d711e901995c1c4da55f83c538b11c24f56",
  "GM_07_residential-project-wide.webp":
    "62e948dd8913a78f9de695b0b218a004f26a8011bbd1c79c70ee3bf8373d62aa",
  "GM_07_trench-and-groundwork.jpg":
    "fae569f6192cf04790abd7f4287d0652b594b59a8114a849b2a173a3268b4a3d",
  "GM_07_trench-and-groundwork.webp":
    "056f394bef577200fc6111f8ecf7b7b25c64d99a34bada12d154b431da13bb2c",
  "GM_08_sprinkler-operating-closeup.jpg":
    "0ed08fbd002ea5253e408b744e3c553cd7ae22472c8bca04a009ec343d13b4ed",
  "GM_08_sprinkler-operating-closeup.webp":
    "b68ec57e42ccb894b211e50dd391a97cac47fdfcaa85a1cdfd5f7c7a35c508f5",
  "GM_08_sprinkler-watering-new-site.jpg":
    "0873b05f7c22d2ac8b63f921549a216cfbfc754cb4f2f7f260280715acd336e9",
  "GM_08_sprinkler-watering-new-site.webp":
    "3c471ed4496e4a25f8f8cf5041c6a5c2e71f73547f89933b4df470f461e5ee77",
  "GM_08_yard-irrigation-and-site.jpg":
    "99804555eefa5b6e6a56315f22ff3b9e0d68ec3f7f6c526fdca518d49512484d",
  "GM_08_yard-irrigation-and-site.webp":
    "cf4ffaf707d42731bd35e4d38597c129a0f15eefe318fcf0625c9707f1987bf5",
};

function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"';
        index++;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if (character === "\n" && !quoted) {
      row.push(cell.replace(/\r$/, ""));
      if (row.some((value) => value.length)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }
  assert.equal(quoted, false, "CSV has an unterminated quoted field");
  if (cell.length || row.length) {
    row.push(cell.replace(/\r$/, ""));
    if (row.some((value) => value.length)) rows.push(row);
  }
  const headers = rows.shift();
  assert.ok(headers, "CSV header is missing");
  return rows.map((values, index) => {
    assert.equal(
      values.length,
      headers.length,
      `CSV row ${index + 2} has an invalid field count`,
    );
    return Object.fromEntries(
      headers.map((header, column) => [header, values[column]]),
    );
  });
}

async function verifyImage(
  filePath: string,
  originalName: string,
  expectedFormat: string,
) {
  const bytes = await readFile(filePath);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    sourceHashes[originalName],
    `${originalName}: checksum differs from the supplied original`,
  );
  const metadata = await sharp(bytes).metadata();
  assert.equal(
    metadata.format,
    expectedFormat,
    `${originalName}: format mismatch`,
  );
  assert.equal(metadata.width, 512, `${originalName}: width must be 512px`);
  assert.equal(metadata.height, 910, `${originalName}: height must be 910px`);
}

async function main() {
  const root = process.cwd();
  const csv = parseCSV(
    await readFile(path.join(root, "assets/asset_manifest.csv"), "utf8"),
  );
  assert.equal(csv.length, 22, "Asset manifest must contain 22 unique images");
  assert.equal(
    greenmanGallery.length,
    22,
    "Typed gallery must contain all 22 images",
  );
  assert.equal(
    new Set(greenmanGallery.map((photo) => photo.id)).size,
    22,
    "Gallery ids must be unique",
  );
  assert.equal(
    new Set(greenmanGallery.map((photo) => photo.src)).size,
    22,
    "Gallery image paths must be unique",
  );
  assert.equal(
    new Set(csv.map((row) => row.asset_webp)).size,
    22,
    "CSV WebP paths must be unique",
  );
  assert.equal(
    new Set(csv.map((row) => row.asset_jpg)).size,
    22,
    "CSV JPEG paths must be unique",
  );
  const publicFolder = path.join(root, "public/images/greenman");
  const originalFolder = path.join(root, "assets/originals");
  const expectedWebp = csv.map((row) => path.basename(row.asset_webp)).sort();
  const expectedJpg = csv.map((row) => path.basename(row.asset_jpg)).sort();
  assert.deepEqual(
    (await readdir(publicFolder))
      .filter((file) => file.endsWith(".webp"))
      .sort(),
    expectedWebp,
    "Public WebP inventory differs from the supplied manifest",
  );
  assert.deepEqual(
    (await readdir(originalFolder))
      .filter((file) => file.endsWith(".jpg"))
      .sort(),
    expectedJpg,
    "Original JPEG inventory differs from the supplied manifest",
  );

  const counts: Record<string, number> = {};
  for (const row of csv) {
    const filename = path.basename(row.asset_webp);
    const originalJpg = path.basename(row.asset_jpg);
    assert.equal(
      row.asset_webp,
      `images/${filename}`,
      `Unexpected source path: ${row.asset_webp}`,
    );
    assert.equal(
      row.asset_jpg,
      `images/${originalJpg}`,
      `Unexpected source path: ${row.asset_jpg}`,
    );
    const id = filename.replace(/\.webp$/, "");
    assert.ok(
      id.startsWith(`${row.id}_`),
      `${filename}: source-video grouping differs from manifest`,
    );
    assert.equal(originalJpg, `${id}.jpg`, `${filename}: JPEG name mismatch`);
    const photo = greenmanGallery.find((item) => item.id === id);
    assert.ok(photo, `${filename}: missing typed gallery entry`);
    assert.equal(
      photo.src,
      `/images/greenman/${filename}`,
      `${filename}: incorrect public path`,
    );
    assert.equal(
      photo.alt,
      row.alt_text,
      `${filename}: alt text differs from manifest`,
    );
    assert.ok(photo.alt.trim().length, `${filename}: alt text is empty`);
    assert.equal(
      photo.category,
      row.category,
      `${filename}: category differs from manifest`,
    );
    assert.equal(
      photo.sourceVideo,
      row.video_filename,
      `${filename}: source video differs from manifest`,
    );
    assert.equal(
      photo.timestampSeconds,
      Number(row.timestamp_seconds),
      `${filename}: timestamp differs from manifest`,
    );
    assert.equal(
      photo.featured,
      row.featured === "Yes",
      `${filename}: featured status differs from manifest`,
    );
    assert.equal(
      row.resolution,
      "512x910",
      `${filename}: manifest resolution mismatch`,
    );
    assert.equal(photo.width, 512, `${filename}: typed width mismatch`);
    assert.equal(photo.height, 910, `${filename}: typed height mismatch`);
    assert.ok(
      photo.placement.includes("/gallery"),
      `${filename}: missing gallery placement`,
    );
    assert.ok(
      ["pending", "approved"].includes(photo.publicationStatus),
      `${filename}: invalid publication status`,
    );
    await Promise.all([
      verifyImage(path.join(publicFolder, filename), filename, "webp"),
      verifyImage(path.join(originalFolder, originalJpg), originalJpg, "jpeg"),
    ]);
    counts[photo.category] = (counts[photo.category] ?? 0) + 1;
  }
  console.log(
    "Asset verification passed: 22 WebP + 22 original JPEG images; all 44 files are 512×910 and SHA-256 exact copies.",
  );
  console.log(
    "All 22 public paths, gallery entries, descriptive alt text, categories, source videos, timestamps and publication statuses match the manifest.",
  );
  console.log(
    `Gallery counts: All Work 22; ${Object.entries(counts)
      .map(([category, count]) => `${category} ${count}`)
      .join("; ")}.`,
  );
}

main().catch((error) => {
  console.error(
    `Asset verification failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});
