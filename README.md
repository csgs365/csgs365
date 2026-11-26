# csgs365.com · 成事365 公社 + 林成事

一个域名两个站：

| 地址 | 内容 |
|---|---|
| <https://csgs365.com/> | 成事365 公社官网（社群介绍、三条线、案例、价格、答疑） |
| <https://csgs365.com/linchengshi/> | 林成事个人 IP 站（我是谁、做过什么、怎么找我） |

## 目录

```
index.html          公社官网首页
404.html
linchengshi/        林成事个人页
  ├─ index.html
  └─ person.css
assets/             两站共用的样式与脚本
  ├─ css/tokens.css   设计变量（两站共用）
  ├─ css/site.css     门户样式
  └─ js/              ui.js（筛选/灯箱/目录高亮）、reveal.js（入场动效）
images/             两站共用图片（12 张，已压缩）
CNAME  .nojekyll  robots.txt  sitemap.xml  favicon.svg
```

## 部署

- 发布源：**`gh-pages` 分支**，根目录
- 站点地址：`csgs365.com`（`CNAME` 文件绑定，勿改）
- 推送后约 1 分钟生效

## 改代码前必读

```bash
bash tools/check.sh      # 33 项验收，应全绿
```

三条路径规则（改错站点必坏）：

| 文件 | 写法 |
|---|---|
| `index.html` | 相对 `assets/...` |
| `linchengshi/index.html` | `../assets/...` |
| `404.html` | 根绝对 `/assets/...`（Pages 对任意深度 404 都返回根目录这个文件） |

## 域名

主域 `csgs365.com` 正常。`www.csgs365.com` 证书尚未覆盖子域，对外统一使用裸域。
