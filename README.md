# Persona Lab 站点复刻

原生 HTML + CSS + JS 的单页站点复刻，零依赖、零构建。
架构与复用规范见 [structure.md](./structure.md)。

## 快速开始

```bash
# 在项目根目录启动静态服务
python3 -m http.server 8433

# 浏览器打开
open http://localhost:8433
```

> 必须从项目根目录起服务（HTML 中资源用 `/assets/...` 绝对路径），
> 直接双击 `index.html`（file://）会导致资源 404。

## 目录

```
design.md           # 设计规范（新页面必读）
index.html          # 页面结构（8 区块 + 内联 SVG）
assets/site.css     # 设计系统 + 组件 + 动画
assets/site.js      # i18n / 视频墙 / 轮播等
assets/*.svg        # 占位 poster 与图标
persona.svg         # favicon
scripts/gen_posters.py  # 重新生成占位 poster
```

## 当前为占位资源

视频、字体、部分图片用占位素材代替，页面结构与交互逻辑完整保留。

### 替换真实视频

1. 把 mp4 放入 `assets/`（如 `assets/room-1.mp4`、`assets/vw-1.mp4`）。
2. **静态 `<video>`**（Hero 面板、渲染网格、Agent 网格、Product 服务卡）：
   在标签上补回 `data-src="/assets/xxx.mp4"`，保留 `poster` 作加载前占位。
3. **Gear Zero 轮播**（`assets/site.js` 的 `show()`）：
   ```js
   room.src = BASE + 'room-' + n + '.mp4';
   room.poster = BASE + 'room-' + n + '.jpg';   // 可选，换真实封面
   ```
4. **World Model 滚动墙**（`assets/site.js`）：
   把 `v.poster = BASE + p` 改回 `v.dataset.src = BASE + p`（`observeVideo` 会在进入视口时加载）。

### 替换真实字体

下载并放入 `assets/`，改 `site.css` 顶部 `@font-face` 的 `src`：

- Space Grotesk（拉丁）
- Noto Sans SC（中文）
- Gaegu（wordmark 手写体）

缺失时自动回退 `system-ui`，不会报错。

### 替换数字人背景

把真实图片放 `assets/`，改 `site.css` 中 `.cell.dh-art` 的
`url('/assets/digital-human.svg')` 为实际文件名。

## 常用操作

| 目的 | 位置 |
|---|---|
| 换配色 / 阴影 / 圆角 / 字体 | `site.css` 顶部 `:root` |
| 换文案 | `index.html` 文本 + `site.js` 的 `DICT` 字典 |
| 重新生成占位 poster | `python3 scripts/gen_posters.py` |
| 新增区块 | 见 `structure.md` 第 9 节 |
