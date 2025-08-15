# FundList 组件测试套件

## 概述

这是一个为 FundList 组件创建的全面单元测试套件，专门测试搜索功能和过滤功能。

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行测试

```bash
# 运行所有测试
npm test

# 监控模式运行测试
npm run test:watch

# 生成覆盖率报告
npm run test:coverage

# 运行特定测试文件
npm test FundList.test.tsx
npm test FundListSearch.test.tsx
npm test FundListFilter.test.tsx

# 运行测试脚本
./run-tests.sh
```

## 测试文件结构

```
src/
├── __tests__/
│   ├── FundList.test.tsx          # 主要组件测试
│   ├── FundListSearch.test.tsx    # 搜索功能专项测试
│   ├── FundListFilter.test.tsx    # 过滤功能专项测试
│   ├── mockData.ts                # 测试数据模拟
│   └── example.test.ts            # 配置验证测试
├── setupTests.ts                   # 测试环境配置
└── ...
```

## 测试覆盖功能

### ✅ 搜索功能测试
- 按基金名称搜索（精确、部分、大小写不敏感）
- 按基金代码搜索
- 实时搜索结果更新
- 搜索输入行为验证
- 边缘情况处理（空值、特殊字符、长查询）

### ✅ 过滤功能测试
- 货币筛选器 UI 渲染
- 按不同货币过滤基金
- 过滤选项生成和排序
- 组合搜索和过滤功能
- 过滤状态管理

### ✅ 组件状态测试
- 加载状态显示
- 错误状态处理
- 空状态显示
- 成功状态渲染

### ✅ 用户交互测试
- 点击基金卡片导航
- 表单输入行为
- 重试按钮功能

## 测试统计

- **总测试用例数**: 70+
- **测试文件数**: 4
- **模拟数据集**: 3 套不同场景数据
- **覆盖率目标**: >90%

## 测试技术栈

- **Jest**: 测试框架
- **React Testing Library**: React 组件测试
- **@testing-library/user-event**: 用户交互模拟
- **@testing-library/jest-dom**: DOM 断言扩展
- **ts-jest**: TypeScript 支持

## 测试配置文件

- `jest.config.cjs`: Jest 主配置
- `tsconfig.test.json`: TypeScript 测试配置
- `src/setupTests.ts`: 测试环境设置

## 如何添加新测试

1. 在 `src/__tests__/` 目录下创建测试文件
2. 使用 `.test.tsx` 或 `.spec.tsx` 扩展名
3. 导入需要测试的组件和工具
4. 编写测试用例

### 示例测试模板

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import YourComponent from '../path/to/YourComponent';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(
      <TestWrapper>
        <YourComponent />
      </TestWrapper>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 故障排除

### 常见问题

1. **模块导入错误**: 检查 `tsconfig.test.json` 配置
2. **DOM 测试失败**: 确保使用 `jsdom` 环境
3. **异步测试超时**: 增加 `testTimeout` 配置

### 调试技巧

```bash
# 运行单个测试文件
npm test -- --testNamePattern="specific test name"

# 详细输出
npm test -- --verbose

# 监控模式调试
npm test -- --watch --detectChanges
```

## 持续集成

这些测试可以轻松集成到 CI/CD 流水线中：

```yaml
# GitHub Actions 示例
- name: Run Tests
  run: |
    npm ci
    npm test
    npm run test:coverage
```

## 贡献指南

1. 添加新功能时，请同时添加相应的测试
2. 确保所有测试通过后再提交代码
3. 保持测试覆盖率在 90% 以上
4. 遵循现有的测试命名和结构约定

## 文档

详细的测试文档请参考 `TEST_DOCUMENTATION.md` 文件。
