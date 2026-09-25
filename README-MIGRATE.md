# 作品集网站 · 迁移与持续开发说明

这是从扣子（Coze）环境导出的**标准 Next.js 项目**，已通过 `ts-check` 与 `next build` 验证，可独立运行，且**所有页面均为静态页面**，非常适合部署到 Vercel / Netlify / Cloudflare Pages（免费、可绑定自定义域名）。

## 1. 本地运行（Cursor / 终端）

```bash
# 安装依赖（首次）
pnpm install

# 本地开发（热更新）
pnpm dev
# 打开 http://localhost:3000

# 生产构建并预览
pnpm build
pnpm start
```

> 需要 Node 20+ 与 pnpm（`corepack enable`）。

## 2. 用 Cursor 持续开发

- 用 Cursor 打开本目录即可直接编辑。
- 主要内容文件：
  - `src/lib/i18n.ts` —— 中英文文案、研究方向、首页标题副标题
  - `src/components/Projects.tsx` —— 全部项目数据、项目顺序、详情弹窗内容
  - `src/components/About.tsx / Research.tsx / Awards.tsx / Footer.tsx` —— 各板块
  - `public/` —— 图片、视频素材
- 改完提交 push，远端平台（Vercel 等）自动重新构建上线。

## 3. 部署到 Vercel（免费，可绑定你的域名）

**方案 A：命令行（最快）**
```bash
# 安装 vercel CLI
pnpm add -g vercel

# 在项目目录执行，按提示登录、关联仓库、确认框架为 Next.js
vercel

# 部署到生产
vercel --prod
```

**方案 B：网页拖入（无需命令行）**
1. 把本项目 push 到 GitHub 私有仓库。
2. 打开 vercel.com → Import 该仓库 → 框架自动识别 Next.js → Deploy。
3. 部署成功后进入项目的 **Settings → Domains**，添加 `zhangyuandesign.cn` 与 `www.zhangyuandesign.cn`。
4. 按 Vercel 提示，在**域名解析处**（本项目的域名在火山引擎 DNS 控制台）添加 CNAME 记录，指向 Vercel 给出的目标（通常 `cname.vercel-dns.com`）。

## 4. 生成新二维码

绑定新域名后，重新生成二维码（把脚本拷贝进 `scripts/`，或直接用项目内脚本）：

```bash
node scripts/gen-qr.js --url https://zhangyuandesign.cn --out public/portfolio-qr.png
```

> 二维码编码的是固定网址文本，更换域名后旧码不可沿用，必须重新生成。

## 5. 素材说明

- `public/` 内为网站实际使用的图片与压缩后视频（720p，总计约 150 MB）。
- 高清原片与原始素材不在本目录（如需可从扣子环境 `/workspace/_local_assets/` 取回）。

## 常见问题

- **部署后图片/视频加载慢**：已统一压缩为 720p H.264，若还需优化可调低码率或用对象存储托管大视频。
- **改完想改回扣子版**：原项目仍在扣子环境运行，两者互不影响。