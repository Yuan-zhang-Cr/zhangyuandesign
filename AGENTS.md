# AGENTS.md

## 项目概览

个人作品集网站，展示数字艺术创作者章媛的项目、研究成果和获奖经历。采用苹果风格极简设计，配合暖橙色渐变效果和滚动动画。支持中英文切换。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI**: shadcn/ui + Tailwind CSS 4
- **Styling**: 自定义 CSS 动画 + 毛玻璃效果
- **i18n**: 自建轻量级 Context 方案（无第三方库）

## 目录结构

```
src/
├── app/
│   ├── layout.tsx          # 全局布局 (metadata, 字体, LanguageProvider)
│   ├── page.tsx            # 首页 (组合所有 section)
│   └── globals.css         # 全局样式 (橙色渐变, 毛玻璃, 滚动动画)
├── components/
│   ├── Navigation.tsx      # 固定顶部导航 (毛玻璃 + 语言切换)
│   ├── Hero.tsx            # 首屏 (暖色渐变背景 + 光晕)
│   ├── About.tsx           # 关于我 (教育背景 + 兴趣)
│   ├── Projects.tsx        # 创作项目 (两级交互: 卡片网格 + 详情弹窗)
│   ├── MediaPlaceholder.tsx # 图片/视频占位组件
│   ├── Research.tsx        # 研究成果 (论文列表)
│   ├── Awards.tsx          # 获奖 (网格卡片)
│   ├── Footer.tsx          # 页脚
│   ├── FontPreload.tsx     # 字体预连接 (ReactDOM.preconnect)
│   ├── LanguageProvider.tsx # 中英文切换 Context
│   └── ui/                 # shadcn/ui 组件库
├── hooks/
│   └── use-scroll-animation.ts  # 滚动动画 hook
└── lib/
    ├── i18n.ts             # 中英文翻译数据
    └── utils.ts            # 工具函数
```

## 核心交互

### 中英文切换
- 导航栏右侧按钮切换，状态存储在 LanguageProvider Context 中
- 所有组件通过 `useLang()` 获取当前语言和翻译文本

### 项目两级交互
- **第一级**：3列网格卡片，仅显示封面占位、项目标题、关键词标签
- **第二级**：点击卡片弹出详情弹窗（Modal），包含完整描述、媒体占位、亮点、成果等

## 配色方案

- 强调色：#FF6B35（暖橙）→ #F7931E（琥珀）
- 深色强调：#E85D04
- Hero背景：暖白到淡桃渐变

## 图片/视频替换指南

项目中所有图片和视频使用 `MediaPlaceholder` 组件占位。替换步骤：
1. 将素材文件放入 `public/` 目录
2. 在 `Projects.tsx` 中找到对应项目的 `mediaItems` 数组
3. 将 `MediaPlaceholder` 替换为 `<img src="/filename.jpg" />` 或 `<video src="/filename.mp4" controls />`

## 项目详情弹窗文字格式规范

所有创作项目的详情弹窗使用统一的文字格式：

### 格式样式
- **小标题**：放大、黑色、加粗（text-lg font-medium text-[#1D1D1F]）
- **正文**：灰色小字（text-sm text-[#1D1D1F]/70）
- **列表项**：紫色圆点（bg-[#8B5CF6]）+ 灰色文字

### 段落结构（按顺序）
1. **项目简介**（description）：第一段，纯文本段落
2. **我的角色**（role）：小标题 + 列表项
3. **技术规格**（techStack）：小标题 + 列表项
4. **设计洞察**（designInsights）：小标题 + 列表项
5. **核心玩法与系统设计**（highlights）：小标题 + 列表项
6. **游戏演示视频**（videoSrc）：独立一栏，带小标题
7. **项目成果**（achievements）：小标题 + 列表项

### 数据接口
```typescript
interface ProjectData {
  id: string;
  title: { zh: string; en: string };
  keywords: { zh: string[]; en: string[] };
  role: { zh: string; en: string };
  period: string;
  coverLabel: { zh: string; en: string };
  mediaItems: MediaItem[];
  description: { zh: string; en: string };
  designInsights?: { zh: InsightItem[]; en: InsightItem[] };
  highlights: { zh: string[]; en: string[] };
  achievements: { zh: string[]; en: string[] };
  videoSrc?: string;
  videoLabel?: { zh: string; en: string };
  techStack?: { zh: string[]; en: string[] };
}

interface MediaItem {
  type: "image" | "video";
  label: { zh: string; en: string };
  src: string;
  caption?: { zh: string; en: string };
}

interface InsightItem {
  title: { zh: string; en: string };
  content: { zh: string; en: string };
}
```

## 开发命令

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm ts-check` - TypeScript 类型检查
- `pnpm lint` - ESLint 检查

## 生产部署与域名

### 正式应用信息
- **App ID**: `7688605485209010217`
- **Project ID**: `7670460823738826767`
- **生产地址**: `https://76gk6whvnw.page.coze.site`（Pages 静态托管，持久有效，不会因开发沙箱关闭而失效；与临时的 `*.dev.coze.site` 开发预览域名不同）
- **终版二维码**: `public/portfolio-qr.png`，指向上述生产地址

### 部署命令
1. 首次需授权（OAuth 设备激活）：`coze deploy auth login`（终端会打印 device-activation 链接，窗口有时效，需尽快确认；凭证写入 `/root/.coze/cli/config.json`）
2. 发起部署并等待完成：
   `coze deploy --app-id 7688605485209010217 --application-type pages --message "<说明>" --yes --wait`
3. 查看线上地址：`coze deploy online --app-id 7688605485209010217`
4. 构建日志：`coze deploy build-log --app-id <appId> --deploy-id <deployId>`

### 打包与体积限制（重要）
- 部署打包脚本 `@coze-arch/cli/lib/deploy/package-project.js` 直接遍历**文件系统**，只硬编码排除 `.next / node_modules / .git / .codegraph` 等，**不读取 `.gitignore`，也不看 git 索引**。
- 源码包上限约 **980 MB**；Next.js 构建成功后，**Pages 最终静态归档上限约 500 MB**（超限会在 "Creating normalized Pages archive" 阶段失败）。
- 因此 `public/` 内素材要小：演示视频已统一压缩到 **1280x720、H.264 CRF26、AAC 96k**（`-movflags +faststart`），6 个视频总计约 53 MB。
- **原始素材与原片已移出源码根**（不参与打包，也不影响网站运行）：
  - 原始素材：`/workspace/_local_assets/zhang-yuan-assets/`
  - 视频原片备份：`/workspace/_local_assets/original-videos/`
  替换/重新压缩时从这里取回即可。

### 自定义域名现状
- 当前账号无"自定义域名权益"，`coze deploy domain add zhangyuandesign.cn` 返回 `no custom domain benefit`（业务码 130000007）。绑定自有域名需开通对应套餐后再执行 `domain add` 并按提示配置 DNS（CNAME）。
- CLI 0.1.8 的 `coze deploy domain set-prefix <prefix> --yes` 存在 `--yes` 不被识别的缺陷，暂无法改官方子域名前缀。
- 一旦成功绑定正式域名，只需重新生成二维码：`node scripts/gen-qr.js --url https://<正式域名>`。二维码编码的是固定网址文本，更换域名后旧码不可沿用。
