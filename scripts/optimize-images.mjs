/**
 * Otimiza imagens estáticas em public/ com sharp.
 * - Produtos: WebP 800w (canônico) + 400w (`*-400.webp`)
 * - Hero: AVIF + WebP (1920w / 960w) + JPG fallback
 * - OG: JPG 1200×630 (`og-cover.jpg`)
 * - Ícone: PNG comprimido (`icon2.png`)
 *
 * Uso: npm run optimize:images
 * Fontes de produto: PNG/JPG (convertidos) ou WebP canônico já existente.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const imgDir = path.join(publicDir, "img");

const PRODUCT_LG = 800;
const PRODUCT_SM = 400;

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function fileSize(filePath) {
  try {
    return (await fs.stat(filePath)).size;
  } catch {
    return 0;
  }
}

function productBaseName(file) {
  return file
    .replace(/-400\.(webp|avif)$/i, "")
    .replace(/\.(png|jpe?g|webp|avif)$/i, "");
}

async function optimizeProducts() {
  const entries = await fs.readdir(imgDir);
  const bases = new Set();

  for (const file of entries) {
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
    if (/-400\.(webp)$/i.test(file)) continue;
    bases.add(productBaseName(file));
  }

  let before = 0;
  let after = 0;
  let count = 0;

  for (const base of [...bases].sort()) {
    const candidates = [
      path.join(imgDir, `${base}.png`),
      path.join(imgDir, `${base}.jpg`),
      path.join(imgDir, `${base}.jpeg`),
      path.join(imgDir, `${base}.webp`),
    ];

    let srcPath = null;
    for (const candidate of candidates) {
      if (await fileSize(candidate)) {
        srcPath = candidate;
        break;
      }
    }
    if (!srcPath) continue;

    const srcBytes = await fileSize(srcPath);
    before += srcBytes;

    const buffer = await fs.readFile(srcPath);
    const pipeline = sharp(buffer).rotate();

    const outLg = path.join(imgDir, `${base}.webp`);
    const outSm = path.join(imgDir, `${base}-400.webp`);

    await pipeline
      .clone()
      .resize({
        width: PRODUCT_LG,
        height: 1000,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 78, effort: 6 })
      .toFile(outLg);

    await pipeline
      .clone()
      .resize({
        width: PRODUCT_SM,
        height: 500,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 76, effort: 6 })
      .toFile(outSm);

    // Remove PNG/JPG fonte após gerar WebP canônico
    if (/\.(png|jpe?g)$/i.test(srcPath) && srcPath !== outLg) {
      await fs.unlink(srcPath);
    }

    const lgBytes = await fileSize(outLg);
    const smBytes = await fileSize(outSm);
    after += lgBytes + smBytes;
    count += 1;
    console.log(
      `  ${base}  ${kb(srcBytes)} → ${kb(lgBytes)} (800) + ${kb(smBytes)} (400)`
    );
  }

  return { count, before, after };
}

async function optimizeHero() {
  const src = path.join(publicDir, "background-hero.jpg");
  const srcBytes = await fileSize(src);
  if (!srcBytes) {
    console.warn("  (hero fonte ausente, pulando)");
    return { before: 0, after: 0 };
  }

  const input = sharp(await fs.readFile(src)).rotate();
  const outLgWebp = path.join(publicDir, "background-hero.webp");
  const outSmWebp = path.join(publicDir, "background-hero-sm.webp");
  const outLgAvif = path.join(publicDir, "background-hero.avif");
  const outSmAvif = path.join(publicDir, "background-hero-sm.avif");

  await input
    .clone()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(outLgWebp);

  await input
    .clone()
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toFile(outSmWebp);

  await input
    .clone()
    .resize({ width: 1920, withoutEnlargement: true })
    .avif({ quality: 55, effort: 4 })
    .toFile(outLgAvif);

  await input
    .clone()
    .resize({ width: 960, withoutEnlargement: true })
    .avif({ quality: 52, effort: 4 })
    .toFile(outSmAvif);

  const jpgBuffer = await input
    .clone()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(src, jpgBuffer);

  const after =
    (await fileSize(outLgWebp)) +
    (await fileSize(outSmWebp)) +
    (await fileSize(outLgAvif)) +
    (await fileSize(outSmAvif)) +
    (await fileSize(src));

  console.log(
    `  hero  ${kb(srcBytes)} → webp ${kb(await fileSize(outLgWebp))}/${kb(await fileSize(outSmWebp))}  avif ${kb(await fileSize(outLgAvif))}/${kb(await fileSize(outSmAvif))}  jpg ${kb(await fileSize(src))}`
  );
  return { before: srcBytes, after };
}

async function optimizeOgCover() {
  const heroSrc = path.join(publicDir, "background-hero.jpg");
  const logoSrc = path.join(publicDir, "favicon.svg");
  const outPath = path.join(publicDir, "og-cover.jpg");

  const heroBytes = await fileSize(heroSrc);
  if (!heroBytes) {
    console.warn("  (hero ausente, pulando OG)");
    return { before: 0, after: 0 };
  }

  const W = 1200;
  const H = 630;

  const base = await sharp(await fs.readFile(heroSrc))
    .rotate()
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.72, saturation: 0.95 })
    .toBuffer();

  const overlaySvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0d3d38" stop-opacity="0.88"/>
          <stop offset="55%" stop-color="#0d3d38" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#0d3d38" stop-opacity="0.12"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="72" y="292" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="600" fill="#ffffff">Life Simple</text>
      <text x="72" y="348" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#ffffff" fill-opacity="0.88">Farmácia de manipulação · Porto Alegre</text>
    </svg>
  `);

  const composites = [
    { input: await sharp(overlaySvg).png().toBuffer(), left: 0, top: 0 },
  ];

  if (await fileSize(logoSrc)) {
    const logo = await sharp(await fs.readFile(logoSrc))
      .resize(88, 88)
      .png()
      .toBuffer();
    composites.push({ input: logo, left: 72, top: 72 });
  }

  await sharp(base)
    .composite(composites)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  const after = await fileSize(outPath);
  console.log(`  og-cover.jpg  ${kb(after)} (1200×630)`);
  return { before: heroBytes, after };
}

async function optimizeOgIcon() {
  const src = path.join(publicDir, "icon2.png");
  const srcBytes = await fileSize(src);
  if (!srcBytes) return { before: 0, after: 0 };

  const tmp = src + ".tmp";
  await sharp(src)
    .resize({ width: 512, height: 512, fit: "cover" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(tmp);
  await fs.rename(tmp, src);
  const after = await fileSize(src);
  console.log(`  icon2.png  ${kb(srcBytes)} → ${kb(after)}`);
  return { before: srcBytes, after };
}

async function main() {
  console.log("Otimizando imagens…\nProdutos:");
  const products = await optimizeProducts();
  console.log("\nHero:");
  const hero = await optimizeHero();
  console.log("\nOG:");
  const og = await optimizeOgCover();
  const icon = await optimizeOgIcon();

  const before = products.before + hero.before + icon.before;
  const after = products.after + hero.after + og.after + icon.after;
  console.log(
    `\nPronto: ${products.count} produtos (800+400) + hero (avif/webp/jpg) + og-cover (${kb(og.after)})`
  );
  if (before > 0) {
    console.log(`Referência fontes→saídas: ${kb(before)} → ${kb(after)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
