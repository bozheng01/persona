# Persona Lab 设计规范（Design Spec）

> 本文档是**唯一设计依据**。任何新增页面前必须先阅读本文件并严格遵循，
> 保证整个项目风格统一。实现层面所有值都能在 `assets/site.css` 中找到对应
> token（见文末「CSS 变量对照」）。

---

## 1. 配色

暖色「studio」风：奶油底 + 橙/深红强调 + 近黑文字。**强调色只允许橙、红两条线，禁止引入新的彩色。**

| 角色 | 变量 | 色值 | 用途 |
|---|---|---|---|
| 主色 | `--orange` | `#f58220` | 按钮、高亮、眉标、导航栏 |
| 主色 hover | `--orange-deep` | `#e8710a` | 按钮 hover |
| 辅助色 | `--red` | `#c1272d` | 跑马灯、旗舰卡、HOT/NEW、页脚起点 |
| 辅助色深端 | `--red-deep` | `#7e1218` | 页脚/地面渐变底部、Hero 红影 |
| 背景色 | `--paper` | `#fdf6ec` | 页面暖奶油底 |
| 卡片底 | `--card` | `#ffffff` | 卡片白 |
| 卡片浅底 | `--card-alt` | `#fdf3e3` | 次级卡片 / hover |
| 分隔带 | `--band` | `#f3e4ce` | 滚动条槽、分隔 |
| 正文色 | `--ink` | `#241e1a` | 所有文字与描边（暖近黑） |
| 次级文字 | `--ink-70` | `rgba(36,30,26,0.72)` | 说明文字 |
| 弱线 | `--ink-15` | `rgba(36,30,26,0.12)` | 分隔线、虚线 |
| 琥珀点缀 | `--gear-yellow` | `#ffb43d` | Gear 面板内点缀 |
| 金色 | `--gold` | `#e0a53a` | 星标等小点缀 |

**白与黑**：亮色块上文字用白 `#ffffff`；墨色块上文字用 `--ink`。选区高亮 = 橙底。

---

## 2. 字体

字体栈（拉丁在前、CJK 在后）：

```css
--text / --display / --ui:
  'Space Grotesk', 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;
--script: 'Gaegu', 'Comic Sans MS', cursive;   /* 仅 Gear 面板的 "zero" 用 */
```

| 层级 | 字号 | 字重 | 行高 | 其它 |
|---|---|---|---|---|
| Hero 大标题 h1 | `clamp(1.5rem, 3.7vw, 3rem)` | 800 | 1.12 | 全大写、字距 `-0.02em`、白色、允许换行 |
| 区块标题 h2 | `clamp(2.25rem, 4.6vw, 3.75rem)` | 800 | 1.0 | 全大写、字距 `-0.01em` |
| 卡片标题 h3 | `1.625rem`（主图卡 2rem，旗舰卡 `clamp(2rem,3.4vw,2.75rem)`） | 800 | 1.15 | 全大写 |
| 眉标 eyebrow | `0.8125rem` | 700 | — | 全大写、字距 `0.18em`、**橙**色 |
| 正文 body | `1.0625rem` | 400 | 1.5 | `--ink` |
| 卡片正文 | `1rem` | 400 | 1.5 | `--ink-70` |
| Hero 副标题 | `1.375rem`（桌面 1.1875rem） | 400 | 1.55 | 白色 90% |
| 导航链接 | `0.8125rem` | 700 | — | 全大写、字距 `0.06em`、白色 |

规则：标题一律粗体大写；正文小号、次级色，形成强对比。

---

## 3. 间距

| 位置 | 值 |
|---|---|
| 页面容器 `.container` | 最大宽 `1400px`；左右内边距 `28px`（≥1024px 时 `48px`） |
| 区块间距 `.section` | 上下 `128px` |
| 模块网格 `.bento` / `.sol-grid` | 上距 `56px`，列间距 `24px` |
| 卡片内边距 `.cell` | `32px` |
| 卡片标题到正文 | `8px`；眉标到标题 `14px` |
| Chips 组 | 上距 `20px`，项间距 `10px` |
| 按钮内边距 | `14px 30px` |
| Hero 内容 | `96px 24px`（桌面 `96px 40px`） |
| 页脚 `.footer-grid` | 上下 `88px`，左右 `28px`（≥1024px `48px`），列间距 `56px` |

呼吸感原则：区块之间给足 128px，卡片间距 24px，文字与相邻元素至少 8–20px。

---

## 4. 组件样式

### 按钮
- 形状：**胶囊** `border-radius: 999px`，无边框（ghost 除外）
- 主按钮 `.btn-primary`：橙底 `--orange` + 白字，字重 700，阴影 `--pop`
  - hover：上浮 `translateY(-3px)`、阴影升一档、背景 `--orange-deep`
  - 在橙/红背景上的变体：白底 + 墨字（Hero）；在橙色贴纸上：墨底 + 白字（Contact）
- 幽灵按钮 `.btn-ghost`：透明底 + `2px` 墨描边，无阴影；hover 背景 `--card-alt`
- active 一律归位、阴影降档

### 卡片
- `.cell`：白底、**无边框**、圆角 `32px`、柔和阴影 `--pop`、内边距 `32px`
- hover：上浮 `translateY(-4px)`、阴影升一档（`--pop-lg`）
- 变体：
  - 旗舰卡 `.svc-feature`：**深红渐变** `140deg #d43a34→#7e1218` + 白字，内部小卡半透明白
  - 次级卡 `.svc-synthetic`：`--card-alt` 奶油底
- 视频/图片圆角 `16–20px`，无描边

### 导航栏
- 固定顶栏，**橙底 `--orange`**、白字，底部 `1px` 半透明分隔 + 轻投影
- 链接：大写、白字、hover 下方 2px 白色下划线
- 语言切换 `.lang`：**透明底 + 2px 白描边 + 圆角 14px + 白字**；激活项 = 白底 + 橙字；分隔线半透明白
- 主 CTA：白底 + 橙字胶囊
- Logo：白色图形 + 奶油色飘带（页脚同样转白）

### 徽章 / Chips
- 胶囊、白底、`--pop-sm` 阴影、字重 600
- `.chip.highlight`：橙底 + 白字
- `HOT!` / `NEW` 徽章：**红底 + 白字**，内嵌胶囊，`HOT!` 微旋转
- 旗舰 chip `.chip-featured`：红色渐变 + 白字

### 跑马灯 / 页脚
- 跑马灯 `.ticker`：**红底 `--red`** + 奶油字，无缝滚动
- 页脚：**红渐变** `180deg #c1272d→#8f1418→#6d0f14` + 白字；列标题白、正文白 80%

### 其它
- 焦点态：`outline: 3px solid var(--ink)`，偏移 3px
- 阴影体系（一律柔和扩散、无色）：

```css
--pop-sm: 0 2px 6px rgba(36,30,26,0.10);
--pop:    0 8px 22px rgba(36,30,26,0.12);
--pop-lg: 0 18px 44px rgba(36,30,26,0.16);
```

---

## 5. 响应式（手机 / 电脑）

移动优先，按 `min-width` 递增：

| 断点 | 变化 |
|---|---|
| ≤404px | 导航压缩（缩小 logo/字距/内边距），保证一行放下 |
| ≤479px | 手机细节降级 |
| 640px | 显示社交图标 |
| 768px | 卡片网格 2 列、页脚 3 列 |
| 1024px | 导航链接展开、容器边距 48px |
| 1080px | **Hero 变双栏**（文案左 + Gear 面板右）；以下为上下堆叠 |
| 1240px | Bento 网格 6 列 |

关键约定：
- 手机上所有区块单列堆叠、全宽；卡片、Chips 自然换行，禁止横向溢出
- Hero 大标题允许换行（在「；」处断开）；桌面 ≥1080 双栏
- 高度单位用 `dvh` 并保留 `vh` 回退
- 动画全部受 `prefers-reduced-motion` 保护

---

## 附：CSS 变量对照（`assets/site.css`）

- 颜色：`--paper --card --card-alt --band --ink --ink-70/45/15 --orange --orange-deep --red --red-deep --cream --gear-yellow --gold`
- 圆角：`--radius: 22px`、`--radius-lg: 32px`、`--pill: 999px`
- 阴影：`--pop-sm / --pop / --pop-lg`（及 `-lift` 档）
- 字距：`--display-tracking: -0.01em`

> 换肤/换风格：优先改 `site.css` 末尾 **STYLE ITERATION** 段的 `:root` 与组件覆盖，不要破坏结构类。