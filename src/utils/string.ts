export function formatString(input: unknown): string {
  // 判断是否为字符串
  if (typeof input !== 'string') {
    return '';
  }

  // 移除开头和结尾的空格
  const trimmed = input.trim();
  if (!trimmed) return '';

  // 替换下划线和连字符为空格
  const replaced = trimmed.replace(/[_-]+/g, ' ');

  // 首字母大写，其余保持不变
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
}
