import fs from 'fs';

const path = process.argv[2] || 'dist/stats.html';
const html = fs.readFileSync(path, 'utf8');
const start = html.indexOf('const data = ');
if (start < 0) {
  console.error('Could not find embedded data in', path);
  process.exit(1);
}
let i = start + 'const data = '.length;
let depth = 0;
for (; i < html.length; i++) {
  const c = html[i];
  if (c === '{') depth++;
  else if (c === '}') {
    depth--;
    if (depth === 0) {
      i++;
      break;
    }
  }
}
const data = JSON.parse(html.slice(start + 'const data = '.length, i));
const meta = data.nodeMetas || data.nodeParts?.metas || {};

const leaves = [];
for (const [uid, node] of Object.entries(meta)) {
  if (!node.renderedLength) continue;
  const parts = data.nodeParts?.[uid] || [];
  const label =
    parts.map((p) => p.name).filter(Boolean).join(' › ') ||
    node.id ||
    uid;
  leaves.push({
    label,
    size: node.renderedLength,
    gzip: node.gzipLength || 0,
  });
}
leaves.sort((a, b) => b.size - a.size);

console.log('\n=== Top 25 modules (rendered) ===\n');
leaves.slice(0, 25).forEach((x, n) => {
  console.log(
    `${String(n + 1).padStart(2)}. ${(x.size / 1024).toFixed(1)} KB` +
      (x.gzip ? ` (${(x.gzip / 1024).toFixed(1)} KB gzip)` : '') +
      `\n    ${x.label.slice(-100)}\n`
  );
});

const chunkTotals = {};
for (const leaf of leaves) {
  const m = leaf.label.match(/assets\/[^/]+\.(js|css)/);
  if (m) {
    const chunk = m[0];
    chunkTotals[chunk] = (chunkTotals[chunk] || 0) + leaf.size;
  }
}
console.log('=== Chunk totals (from nodeMetas) ===\n');
Object.entries(chunkTotals)
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, v]) => console.log(`${(v / 1024).toFixed(1)} KB  ${k}`));
