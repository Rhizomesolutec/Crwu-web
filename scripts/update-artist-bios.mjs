/**
 * Safe, idempotent artist-bio updater.
 *
 * Updates ONLY the `fullBio` field (the full standardized biography shown
 * in the About section) on existing Artist documents, matched strictly by
 * their unique `subdomain`. Does not touch images, socialLinks, releases,
 * booking config, slug, or subdomain — and never creates new documents.
 *
 * This is the same text authored in src/lib/seed-data.ts (fullDescription),
 * which the app's own syncArtistsFromSeed() already keeps in sync on every
 * request. This script exists to update the database immediately and to
 * explicitly report on match/missing status per artist, without needing to
 * warm every route first.
 *
 * Usage: node scripts/update-artist-bios.mjs
 */
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf8");

for (const line of env.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim();
  if (!process.env[key]) process.env[key] = value;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI missing");
  process.exit(1);
}

// subdomain -> standardized full biography (must match src/lib/seed-data.ts)
const BIOS = {
  mhr:
    "M.H.R is an emerging independent hip-hop artist known for delivering emotionally driven lyrics, powerful storytelling, and a distinctive musical style. Blending modern rap with authentic expression, M.H.R creates tracks that resonate with listeners through raw emotion, meaningful narratives, and memorable performances, making him a rising talent in the independent music scene.",
  lilpayyan:
    "Lil PAYYAN is a dynamic hip-hop artist known for blending melodic flows, sharp lyricism, and modern Malayalam rap into a unique sound. His music combines raw storytelling with energetic performances, making him one of the emerging voices in the independent rap scene.",
  joker390p:
    "JOKER390P is a versatile hip-hop artist recognized for his powerful delivery, energetic stage presence, and fusion of regional influences with contemporary rap. With multiple successful collaborations and standout releases, he continues to push the boundaries of independent hip-hop through bold sound and authentic expression.",
  sa:
    "SA is an experimental rap artist known for pushing creative boundaries and reshaping the sound of the underground scene. Blending unconventional production with sharp, introspective lyricism, SA crafts music that feels raw, honest, and fearless. Each release reflects a restless drive to experiment, resulting in a distinctive sonic identity that continues to evolve with every project.",
  azwin:
    "AZWIN is an alternative hip-hop artist known for lyricism that cuts deep and stories that others are afraid to tell. With a bold, introspective approach, AZWIN blends sharp wordplay with emotional honesty, crafting tracks that confront real experiences head-on. His unfiltered voice and distinctive style mark him as a compelling presence in the independent hip-hop scene.",
  nazeebbillu:
    "Nazeeb Billu is a street rap artist known for delivering authentic, raw, and unapologetic music straight from real-life experience. His gritty flow and direct lyricism capture the energy of the streets, blending honesty with hard-hitting delivery. With every track, Nazeeb Billu stays true to his roots, building a reputation as one of the scene's most genuine voices.",
  wraithv:
    "Wraith V is a dark rap artist known for haunting, atmospheric production and razor-sharp delivery. Often described as a phantom in the booth, he approaches every beat with surgical precision, layering brooding tones with intense lyricism. His music carves out a distinct sonic space within the underground, marked by tension, mood, and unrelenting focus.",
  efymusic:
    "Efy Music is an underground Hip-Hop artist known for delivering raw lyrics, authentic storytelling, and uncompromising energy. Drawing inspiration from real-life experiences and street culture, Efy Music creates hard-hitting tracks that blend gritty flows with powerful messages. Each release channels genuine emotion and unfiltered perspective, representing the true spirit of independent Hip-Hop and its evolving underground community.",
  fazilas:
    "Fazil AS is a genre-bending artist blending hip hop, experimental production, and cultural sounds into a distinctive musical identity. Unafraid to cross stylistic boundaries, he weaves unconventional textures with rhythmic storytelling, creating music that feels both rooted and forward-looking. His experimental approach continues to shape a sound that stands apart from the mainstream.",
  amanikl10:
    "AMANI KL10 is a music producer, DJ, and artist from Malappuram, Kerala, whose sound blends emotion, culture, and experimentation. Inspired by artists like Martin Garrix, he began exploring EDM and DJing during school, shaping an independent creative path. Rooted in Kerala's music scene, he has collaborated with artists including SA, JOKER390P, and MC Mushti, building a sound that feels personal and distinctly his own.",
  sageend:
    "Sage End is a conscious rap artist known as the philosopher of the underground, delivering wisdom through rhythm and thoughtful, layered lyricism. His music explores introspection, purpose, and perspective, balancing sharp wordplay with a calm, grounded delivery. Sage End's reflective style offers listeners more than just sound, inviting them to think as much as they listen.",
  dhstories:
    "DH STORIES is a Kerala-based hip hop and EDM artist known for crafting energetic, story-driven music inspired by culture, politics, and real-life experience. Blending hard-hitting beats with narrative-focused lyricism, his tracks capture the pulse of everyday life while pushing genre boundaries. With a distinctive fusion sound, DH STORIES continues to carve out a unique identity in the independent scene.",
  mcmushti:
    "MC Mushti is a dynamic hip-hop artist, rapper, singer, and lyricist from Kerala, blending raw storytelling with powerful beats and authentic delivery. Known for his energetic flow and versatile style, he fuses Malayalam hip-hop with global rap influences, creating music rooted in real-life experience and culture. Through his distinctive voice, MC Mushti continues to connect with audiences across Kerala and beyond.",
  emziii:
    "Emziii is a new-school hip-hop artist bringing a fresh perspective and a distinctly unique style to the genre. Known for breaking the mold with unconventional flows and bold creative choices, Emziii crafts music that feels forward-thinking and unafraid to experiment. His evolving sound continues to carve out a fresh lane within the independent scene.",
  lilroony:
    "Lil Roony is a vibe rap artist known for catchy hooks and an effortlessly cool delivery that sets him apart. His music blends smooth melodies with laid-back confidence, creating tracks that feel both relaxed and magnetic. With a natural sense of rhythm and style, Lil Roony continues to bring a distinct energy to the independent rap scene.",
  abuxwrong:
    "Abu X-Wrong is a Kerala-based hip-hop artist blending melodic rap with cultural hip-hop elements. Since 2018, he has been an influential voice in the scene, gaining widespread recognition in 2019 when his track became one of the first Malayalam rap songs to reach millions of views, contributing significantly to the growth of Malayalam rap culture.",
  haniyanafisa:
    "Haniya Nafisa is a Kerala-based independent artist known for exploring multiple music genres with a fresh, modern approach. Her versatility allows her to move fluidly between styles, blending emotion and experimentation into music that feels personal and distinctive. With a growing catalog of releases, Haniya Nafisa continues to shape a sound that stands out in the independent scene.",
  parava98:
    "PARAVA 98 is an independent rap artist known for pushing creative boundaries through raw storytelling and a signature flow. Rooted in authentic underground style, his music captures street-inspired narratives with sharp lyricism and powerful delivery. Through consistent releases and energetic performances, PARAVA 98 continues to connect with audiences and build a distinct identity in the scene.",
};

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

try {
  await mongoose.connect(uri);
  const artists = mongoose.connection.collection("artists");

  console.log(`Connected. Updating fullBio for ${Object.keys(BIOS).length} artists...\n`);

  const missing = [];
  const updated = [];

  for (const [subdomain, fullBio] of Object.entries(BIOS)) {
    const result = await artists.updateOne(
      { subdomain },
      { $set: { fullBio } }
    );

    if (result.matchedCount === 0) {
      missing.push(subdomain);
      console.log(`⚠️  Artist not found: ${subdomain}`);
    } else {
      updated.push({ subdomain, words: wordCount(fullBio), modified: result.modifiedCount > 0 });
    }
  }

  console.log("\n--- Bio word counts ---");
  for (const { subdomain, words, modified } of updated) {
    console.log(`${subdomain.padEnd(16)} ${words} words  ${modified ? "(updated)" : "(already up to date)"}`);
  }

  if (missing.length > 0) {
    console.log("\n--- Missing artists (no matching subdomain in DB) ---");
    missing.forEach((s) => console.log(`- ${s}`));
  } else {
    console.log("\nAll 18 artists matched successfully. No missing records.");
  }

  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error("Bio update failed:", error.message);
  process.exit(1);
}
