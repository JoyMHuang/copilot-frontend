#!/bin/bash

echo "🧪 运行 FundList 组件测试套件"
echo "======================================"

echo ""
echo "📊 运行基础组件测试..."
npm test FundList.test.tsx

echo ""
echo "🔍 运行搜索功能测试..."
npm test FundListSearch.test.tsx

echo ""
echo "🎛️ 运行过滤功能测试..."
npm test FundListFilter.test.tsx

echo ""
echo "📈 生成覆盖率报告..."
npm run test:coverage

echo ""
echo "✅ 测试完成！查看 coverage/ 目录获取详细报告"
