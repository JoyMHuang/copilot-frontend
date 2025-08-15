/**
 * 简单示例测试 - 验证测试环境配置
 */
describe('Test Environment', () => {
  it('should be properly configured', () => {
    expect(true).toBe(true);
  });

  it('should have Jest DOM matchers available', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello World';
    document.body.appendChild(div);
    
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent('Hello World');
  });
});
