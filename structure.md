# Persona.ai 站点架构与复用规范

> 本文档描述本项目的架构规则、命名约定与复用方法。改风格时只动设计 token 与 CSS，
> 不要破坏这里的结构约定。

---

## 1. 项目概述

| 项 | 值 |
|---|---|
| 类型 | 单页静态站点（Landing Page） |
| 技术栈 | 原生 HTML + CSS + vanilla JS |
| 依赖 | **零依赖、零构建**。无框架、无打包器、无 npm |
| 预览 | `python3 -m http.server 8433 --directory .` → http://localhost:8433 |
| 设计语言 | 暖色 studio 风：奶油底 + 橙/深红强调 + 厚重白色标题 + 大圆角 + 柔和投影（参考 Supari Studios） |
| 多语言 | EN / 中文 / 日本語，运行时字典切换 |
| 动效 | CSS keyframes + IntersectionObserver，全程尊重 `prefers-reduced-motion` |

---

## 2. 目录结构

```
personahp/
├── index.html            # 唯一页面，全部 8 个区块与内联 SVG
├── persona-app-icon.png # 品牌 app icon（主页 logo + favicon）
├── structure.md          # 本文档
├── assets/
│   ├── site.css          # 唯一样式表（设计系统 + 组件 + 动画 + 响应式）
│   ├── site.js           # 唯一脚本（多个功能 IIFE）
│   ├── digital-human.svg # 数字人卡片背景占位
│   ├── hero-room.svg     # Hero Gear 面板初始 poster
│   ├── room-1..4.svg     # Gear 面板 4 个房间 poster（循环切换）
│   ├── vw-1..6.svg       # World Model 滚动视频墙 poster
│   ├── gr-1..4.svg       # World Compilation 渲染网格 poster
│   ├── ag-1..4.svg       # Game Agent 网格 poster
│   ├── svc-*.svg         # Product 服务卡 poster
│   └── marks/            # 备用装饰 mark：flame / bolt / skull / peace.svg（白色，48×48）
└── scripts/
    └── gen_posters.py    # 生成上述占位 poster 的脚本
```

**规则**：新增资源一律放 `assets/`，HTML 中引用绝对路径 `/assets/xxx`（配合从根目录起的静态服务）。

---

## 3. 页面区块架构

页面由固定顺序的 `<section>` 组成，每块有唯一 `id` 作为导航锚点：

| 顺序 | 区块 | 选择器 / id | 说明 |
|---|---|---|---|
| 1 | Nav | `<header>` | LOGO、锚点导航、社交、GitHub stars、三语切换、CTA |
| 2 | Hero | `.hero` | SVG 日式卡通场景（富士山 / 鸟居 / 樱花 + 角色与机器人）+ Gear Zero 实时构建面板 |
| 3 | Ticker | `.ticker` | 项目名无缝跑马灯 |
| 4 | Directions | `#directions` | Bento 栅格 5 格 |
| 5 | Product | `#solutions` | 服务卡片网格 |
| 6 | Blog | `#blog` | 占位 "Coming soon" |
| 7 | About | `#about` | 团队介绍 + 研究项目 chips |
| 8 | Contact + Footer | `#contact` / `<footer>` | 收尾 CTA + 页脚 |

**规则**：
- 区块内部统一用 `.container` 限宽（`max-width: 1400px; margin: 0 auto; padding: 0 24px`）。
- 区块标题统一结构：`<p class="eyebrow">`（小标签）+ `<h2>`（主标题）。
- 新增区块：复制一个 `<section class="section" id="xxx">` 骨架，并在 nav/footer 补锚点。

---

## 4. 设计系统（CSS 自定义属性）

全部 token 定义在 `site.css` 顶部 `:root`，并在文件末尾的 **「STYLE ITERATION」** 覆盖层里重新调色/调形。**换肤优先改末尾覆盖层的 `:root`。**

> 当前主题：暖色 studio 风（参考 Supari Studios）——橙色主色 + 深红辅助 + 奶油底 + 近黑文字，大圆角、柔和投影、厚重白色标题。

### 4.1 颜色

| 变量 | 值 | 用途 |
|---|---|---|
| `--paper` | `#fdf6ec` | 页面暖奶油底 |
| `--card` | `#ffffff` | 卡片白 |
| `--card-alt` | `#fdf3e3` | 卡片浅底 |
| `--band` | `#f3e4ce` | 分隔带 / 云色 |
| `--ink` | `#241e1a` | 所有文字与描边（暖近黑） |
| `--ink-70/45/15` | rgba | 次级文字 / 弱线 |
| `--on-bright` | `#241e1a` | 亮色块上的文字 |
| `--orange` / `--purple` / `--pink` / `--lavender` | `#f58220` | 主色橙（按钮 / 高亮 / 眉标） |
| `--orange-deep` | `#e8710a` | 橙的 hover |
| `--red` / `--hot-purple` | `#c1272d` | 辅助深红（跑马灯 / 旗舰卡 / HOT） |
| `--red-deep` | `#7e1218` | 页脚 / 地面渐变的深端 |
| `--gear-yellow` | `#ffb43d` | 琥珀点缀（Gear 面板） |
| `--gold` | `#e0a53a` | 金色点缀 |

> 强调色收敛到橙 / 红一支暖色系；旧的粉/黄/紫 token 全部映射到橙或红。

### 4.2 形状与阴影

```css
--radius: 22px;  --radius-lg: 32px;  --pill: 999px;

/* 柔和扩散阴影，三档（替代原来的零模糊硬偏移） */
--pop-sm: 0 2px 6px rgba(36, 30, 26, 0.10);
--pop:    0 8px 22px rgba(36, 30, 26, 0.12);
--pop-lg: 0 18px 44px rgba(36, 30, 26, 0.16);
/* hover 抬 -3~-4px，:active 归位 */
--pop-sm-lift / --pop-lift / --pop-lg-lift
```
--pop:    4px 4px 0 0 var(--shadow);
--pop-lg: 6px 6px 0 0 var(--shadow);
/* hover 抬 +2px，:active 归 0 */
--pop-sm-lift / --pop-lift / --pop-lg-lift
```

**规则**：任何"浮起"的元素都用 `--pop*`，禁止 `box-shadow` 模糊、禁止彩色阴影。

### 4.3 字体

```css
--text / --display / --ui: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif;
--script: 'Gaegu', 'Comic Sans MS', cursive;   /* 仅用于 wordmark 的 "zero" */
--display-tracking: -0.025em;
```

- 拉丁字体永远排在 CJK 前面，保证 "AI"/"Gear Zero" 用 Space Grotesk。
- 每种语言有独立字体栈：`html[lang="zh"]` / `html[lang="ja"]` 覆盖 `--text/--display/--ui`。
- 缺失字体文件时优雅回退到 `system-ui`。

---

## 5. HTML 约定

### 5.1 多语言标记
- 所有需要翻译的**文本节点**加 `data-en="English 原文"`。
- 产品名 / 项目名**不加** `data-en`（原样保留）。
- 需要富文本（含 `<br>` 等）的节点由 JS 的 `RICH` 表按选择器替换。
- 语言切换按钮：`.lang` 容器内 `.lang-btn[data-lang="en|zh|ja"]`。

### 5.2 滚动揭示
- 需要入场动画的元素加 `class="reveal"`；JS 的 IntersectionObserver 在进入视口时加 `.in`。
- Bento / sol-grid 子项通过 `nth-child` 递增 `transition-delay` 实现错峰。

### 5.3 链接 chip
- 统一结构：`<a class="chip">名称<em class="chip-hot|chip-new">HOT!/NEW</em><svg .../></a>`
- `chip-featured` = 重点项目，`highlight` = 新项目。

### 5.4 Bento 栅格
- 容器 `.bento`，子项 `.cell`。
- 跨度类：`.span-4`（大格）/ `.span-2`（小格）；移动端默认 1 列，768px 两列，1240px 六列。
- 视频/艺术格加 `.video-cell` / `.image-cell`，配 `.cell-video-shade` 纸色蒙版保证文字可读。

### 5.5 内联 SVG
- Hero 街景、Directions 巨龙/火焰、齿轮 LOGO 全部**内联**在 HTML 中（非外链图片），便于 CSS 逐部件动画。
- SVG 内动画元素挂语义类名：`.cloud` / `.cast-member` / `.dragon` / `.burn-flame` 等。

---

## 6. CSS 约定

### 6.1 文件组织顺序
1. `@font-face` 声明
2. `:root` 设计 token + 各语言字体栈
3. 基础 reset / `html` / `body` / 选择色 / 滚动条 / `.container`
4. 按区块顺序：Buttons → Nav → Hero → Ticker → Sections → Gear 面板 → Bento → Solutions → Blog → About → Contact → Footer
5. 每个组件块用注释横幅：`/* ---------- 名称 ---------- */`

### 6.2 命名
- 全小写 + 连字符，语义化前缀按区块：`.nav-*`、`.hero-*`、`.gz-*`（Gear Zero）、`.cell-*`、`.svc-*`、`.footer-*`。
- 状态类：`is-on`、`is-building`、`.in`（reveal 完成）、`.js`（挂在 `html` 上）。
- 无 BEM、无 utility 泛滥，组件内直接写选择器。

### 6.3 响应式断点
以 **min-width** 移动优先为主，个别用 max-width 降级：

| 断点 | 用途 |
|---|---|
| `max-width: 360 / 430 / 479 / 559 / 639` | 手机细节降级 |
| `640px` | 显示社交图标 |
| `768px` | 平板：bento 2 列 / sol-grid 2 列 / footer 3 列 |
| `1024px` | 桌面：container 40px padding / nav-links 展开 |
| `1080px` | Hero 双栏（文案左 + Gear 面板右） |
| `1240px` | Bento 6 列 |

### 6.4 动画
- 关键帧命名：`区块-动作`，如 `hero-in`、`marquee`、`cloud-drift`、`flame-flicker`、`gz-cog-spin`、`odo-*`。
- **所有动画必须包在** `@media (prefers-reduced-motion: no-preference) { ... }` 里，或由 JS 的 `reduceMotion` 守卫。
- reveal 类：`html.js .reveal { opacity:0; transform:... } html.js .reveal.in { ... }`。

---

## 7. JS 约定

### 7.1 结构
- 整个文件包裹在一个外层 IIFE：`(function () { ... })();`
- 每个独立功能是**内层 IIFE**，按注释横幅分隔，互不依赖：
  1. `document.documentElement.classList.add('js')` + 全局 `reduceMotion`
  2. 视频懒加载（`observeVideo`）
  3. 语言切换（i18n 字典 / `translateTree` / `fitHeadline`）
  4. World Model 滚动视频墙（动态建 DOM）
  5. Gear Zero 面板轮播（7s/房间）
  6. 项目名跑马灯
  7. 滚动揭示
  8. GitHub stars odometer
- 变量用 `var`，无模块系统、无转译，保证任何现代浏览器直接跑。

### 7.2 视频懒加载（核心复用点）
- `<video>` 用 `data-src` 存真实地址，`preload="none"`。
- `observeVideo(v)` 在进入视口时才赋 `src` 并播放，离开 / 页面隐藏时 `pause()`。
- 占位模式：不写 `data-src`，只给 `poster`，即可显示静态占位且逻辑不变。

### 7.3 全局钩子
- `window.__applyLang()`：供动态插入的节点（如 Gear 房间文案）重新翻译。
- `localStorage` 键：`persona-lang`（语言）、`persona-gh-stars`（星数缓存，TTL 6h）。

### 7.4 性能约定
- `requestAnimationFrame` 跑动画；`IntersectionObserver` + `visibilitychange` 控制启停。

---

## 8. 占位资源约定

本项目视频 / 字体为占位，**替换真实资源即可上线**：

| 资源 | 现状 | 替换方式 |
|---|---|---|
| 视频 | 本地 SVG `poster`，`<video>` 结构与懒加载保留 | 把真实 mp4 放 `assets/`，补回 `data-src`（或改 JS 里对应 BASE 路径） |
| 字体 | 缺失 woff2 → 回退系统字体 | 下载 Space Grotesk / Noto Sans SC / Gaegu woff2 到 `assets/` |
| 图片 | `digital-human.svg` 等 SVG 占位 | 换成真实 webp/png，改 CSS url |

占位 poster 由 `scripts/gen_posters.py` 生成，改配色后重跑即可。

---

## 9. 换肤 / 复用指南

1. **只换视觉**：改 `:root` 的 ~40 个 token（颜色、阴影、圆角、字体栈），不改任何结构。
2. **多主题**：新增 `[data-theme="dark"] { --paper: ...; --ink: ...; }` 覆盖块，JS 切 `document.documentElement.dataset.theme`。
3. **换动画**：改对应 `@keyframes` 与组件里的 `animation:` 引用，保持 `reduced-motion` 包裹。
4. **换内容**：改 HTML 文本 + 同步 JS 里的 i18n 字典（`DICT.en/zh/ja`）与 `RICH` 表。
5. **新增区块**：
   - HTML：加 `<section class="section" id="new">`（eyebrow + h2 + container）
   - CSS：在对应顺序位置加 `/* ---------- New ---------- */` 块
   - JS：如无交互可跳过；需要动效则加独立内层 IIFE

---

## 10. 复用检查清单

- [ ] 无外部依赖 / 无构建步骤，`python3 -m http.server` 能直接跑
- [ ] 所有媒体走 `data-src` 懒加载，占位时有 `poster`
- [ ] 所有动画有 `prefers-reduced-motion` 守卫
- [ ] 新增可见文本有 `data-en`，并进 i18n 字典
- [ ] 阴影只用 `--pop*`，颜色只用 token
- [ ] 响应式至少在 360 / 768 / 1024 / 1240 四档验证
- [ ] 交互元素有 `:focus-visible` 与 `aria-*` 语义
