# 鱼智查官方网站

## 技术栈
- Next.js 13.5.6
- React 18
- TypeScript
- Tailwind CSS

## 开发说明

### 环境要求
- Node.js 18.17.0+
- npm 9.6.7+

### 本地开发
1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 项目结构
```
src/
├── app/                # 页面文件
│   ├── page.tsx       # 首页
│   ├── search/        # 搜索页面
│   └── layout.tsx     # 全局布局
├── components/        # React组件
│   ├── SearchBox.tsx  # 搜索框组件
│   └── RiskCard.tsx   # 风险卡片组件
├── types/            # TypeScript类型定义
│   └── risk.ts       # 风险相关类型
└── utils/            # 工具函数
    └── api.ts        # API相关函数
```

### 构建部署
1. 构建静态文件
```bash
npm run build
```

2. 部署到Cloudflare Pages
- 推送代码到GitHub
- Cloudflare Pages会自动触发部署
- 确保环境变量配置正确

### 注意事项
- 所有命令必须在 `yuzhicha-website` 目录下执行
- 代码提交前请确保通过 lint 检查：`npm run lint`
- 部署前请确保所有依赖版本正确
