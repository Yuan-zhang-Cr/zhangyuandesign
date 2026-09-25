/**
 * 参数化二维码生成脚本
 * 用法：
 *   node scripts/gen-qr.js --url <网址> [--out <输出路径>] [--size <尺寸>] [--dark <颜色>]
 *
 * 示例：
 *   node scripts/gen-qr.js --url https://zhangyuan.com --out public/portfolio-qr.png
 *
 * 说明：
 *   - 默认输出 public/portfolio-qr.png（800x800，深灰内容）
 *   - 以后更换正式域名时，仅需改 --url，无需改脚本
 */
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

function parseArgs(argv) {
  const args = { url: null, out: "public/portfolio-qr.png", size: 800, dark: "#1D1D1F" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--url") args.url = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--size") args.size = parseInt(argv[++i], 10);
    else if (a === "--dark") args.dark = argv[++i];
  }
  return args;
}

(function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.url) {
    console.error("请提供 --url 参数，例如：node scripts/gen-qr.js --url https://zhangyuan.com");
    process.exit(1);
  }

  const outPath = path.resolve(process.cwd(), args.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  QRCode.toFile(outPath, args.url, {
    width: args.size,
    margin: 2,
    color: { dark: args.dark, light: "#ffffff" },
    errorCorrectionLevel: "M",
  }).then(() => {
    console.log(`✅ 二维码已生成：${outPath}`);
    console.log(`   目标网址：${args.url}`);
    console.log(`   尺寸：${args.size}x${args.size}`);
  }).catch((err) => {
    console.error("生成失败：", err.message);
    process.exit(1);
  });
})();