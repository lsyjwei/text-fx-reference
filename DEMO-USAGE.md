# 《告亡者》Demo · 字效样例可用性分析

对照当前实现：`UrbanOpeningSequence` + `urban-opening-fx.css`（系统绿字、血字倒数、载入行 glitch、intro 视频 push-in）。

## 高优先级 · 建议移植

### 1. survival-horror-bleeding（渗血标题）

**技法**：`::after` 伪元素 + `clip-path` 三角血滴下落；相邻段落 `background-clip: text` + 径向渐变模拟血渍沿字渗透。

**可用于**
- 血字倒数 **5→1**：在现有 `.uo-countdown-number` 或 `.game-text--blood` 底缘加 `:after` 血滴（比 LibTV 外挂血滴更可控）
- 副本名「大坟场」：标题级渗血，配合 `--blood` 主题色

**注意**
- 默认字体 Creepster（英文哥特），中文需换 `--font-opening` 或定制字体
- `bloodsoaking` 依赖「标题后紧跟一段落」的 DOM 结构；React 需改成显式 class，不能靠 `~ *:nth-child(2)` 选择器
- `-webkit-background-clip: text` 与现有 gradient 字效可合并，但动画较长（40s 循环），序章建议单次播放 + `animation-fill-mode: forwards`

### 2. glitch-noise-clip（载入行 · 已接入 Demo）

**技法**：`data-text` 双伪元素 + `clip: rect()` 随机切片（`noise-anim`）+ 绿/紫 text-shadow 色差。

**已用于**：序章最后一行 `.uo-load-line--glitch`（`urban-opening-fx.css`），shadow 已改为主题色（异变绿 + 血橙）。

**相对 glitch-clip-rgb**：同一作者系 CodePen 变体，**一个 keyframe 表**驱动两层，更省 CSS；视觉上更「电视雪花条带」。

### 3. glitch-clip-rgb / text-glitch-exo（clip-path RGB glitch · 备选）

**技法**：主字 + `::before`/`::after` 复制 `data-text`，`clip: rect(...)` 关键帧 + 红/绿或红/紫 shadow 错位。

**可用于**
- `.uo-load-line--glitch`：**比现有 skew/RGB 伪元素更「电视雪花」**；可替换或叠加载入行故障
- 系统播报单行：distress 升高时短时触发（与 `.uo-char-glitch` 互补）

**注意**
- `clip: rect()` 已废弃，现代写法用 `clip-path: inset()`；移植时改语法
- 关键帧绑死 `150px` 字高，需按 `--uo-hero-size` 重算或用 `clip-path` 百分比
- 与 **中文多字行** 兼容：逻辑通用，但 clip 高度要按 `line-height` 调

### 3. svg-knockout-video（镂空字 + 视频）

**技法**：SVG `<mask>`：白底矩形减文字 path → 视频/iframe 在底层，镂空区透出动态内容。

**可用于**
- 副本名阶段：**文字内透出 intro 视频**（比全屏叠字更有「被吸入副本」感）
- 需把 path 改为中文轮廓（Illustrator/Font to SVG）或 `<text>` + mask（中文更简单）

**注意**
- 样例用 YouTube iframe；Demo 应换 `<video src={intro}>` + 同层 SVG mask
- 移动端样例隐藏 SVG 只显示静态图，需自己做 responsive fallback
- 与当前「视频全屏 + 字叠上层」架构不同，属于 **可选增强镜头**

## 中优先级 · 可选用片段

### 4. glitch-rubik-spray（Rubik Spray Paint 切片）

**技法**：文字拆 `.part-1`/`.part-2` 两半，translateY 错位 + 多轴 font-family / letter-spacing 抖动 + 彩虹 text-shadow。

**可用于**
- 倒数 **碎裂消失**（`.uo-number-shatter`）前的 0.2s 强化
- 高 distress 全屏 flash 瞬间

**注意**
- 字体 Rubik Spray Paint **不支持中文**；仅适合数字或英文
- 动画较「花」，与告亡者偏克制系统恐怖气质需降饱和、减 rainbow 段

## 低优先级 · 与本 Demo 关系弱

### 5. glassmorphism-portfolio

**内容**：导航玻璃拟态、backdrop-filter、3D 卡片、portfolio 布局。

**可用于**
- 论坛 UI / 酒吧 HUD 面板（`backdrop-filter: blur` + 细边框）
- **与序章字效无关**；若论坛要做「手机 App 感」可参考 header/dropdown 样式

## 与现有实现重叠度

| 现有 | 样例可补充 |
|------|-----------|
| `.uo-load-line--glitch` RGB 伪元素 | clip-path 版更碎、更 CRT |
| `.game-text--blood` SVG filter | bleeding 包纯 CSS 血滴/渗透 |
| `OpeningBackground` push-in | knockout 字内透出视频 |
| `.uo-countdown-number` scale 动画 | bleeding 血滴 + spray 碎裂 |

## 推荐落地顺序

1. **glitch-noise-clip** → 载入行（**已接入** `urban-opening-fx.css`）
2. **bleeding** → 血字倒数底缘
3. **SVG knockout** → 副本名 beat 可选镜头
4. **spray glitch** → 仅倒数 shatter 过渡（数字 only）

## 许可

CodePen 导出包多为 MIT / 无限制个人使用；商用请核对各包 `LICENSE.txt` 与 CodePen 原作者页面。
