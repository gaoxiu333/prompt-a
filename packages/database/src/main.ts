import fs from 'fs';
import path from 'path';

import { translateContent, translateTitle, translateType } from './translate';
import { getPromptsFiles } from './utils';

/**
 * 将数据保存为 JSON 文件
 * @param data 要保存的数据
 * @param filename 文件名（可选，默认为 prompts.json）
 */
function saveToJson(data: any, filename: string = 'prompts.json'): void {
  const jsonData = JSON.stringify(data, null, 2);
  const outputPath = path.join(process.cwd(), 'db', filename);
  fs.writeFileSync(outputPath, jsonData, 'utf-8');
  console.log(`数据已保存到: ${outputPath}`);
}

// 主流程
const data = getPromptsFiles();
saveToJson(data);

async function getAllTypes(data: any) {
  console.log('=====翻译类型=====');
  const types = new Set<string>();

  // 遍历数据收集所有类型
  Object.values(data).forEach((prompt: any) => {
    if (prompt.type) {
      types.add(prompt.type);
    }
  });

  const result = Array.from(types).sort();
  const result_zh = await translateType(JSON.stringify(result));
  const result_obj: { [key: string]: string } = {};
  result.forEach((item: string, index) => {
    result_obj[item] = result_zh[index] || '未知类型';
  });
  return result_obj;
}
// 获取所有名字
async function getAllNames(data: any) {
  console.log('=====翻译名字=====');
  const names = new Set<string>();

  // 遍历数据收集所有名字
  Object.values(data).forEach((prompt: any) => {
    if (prompt.name) {
      names.add(prompt.name);
    }
  });
  const result = Array.from(names).sort();
  const result_zh = await translateTitle(JSON.stringify(result));
  const result_obj: { [key: string]: string } = {};
  result.forEach((item: string, index) => {
    result_obj[item] = result_zh[index] || '未知类型';
  });
  return result_obj;
}
// 格式化，并且翻译为中文
async function formatData(data: any) {
  const allTypes = await getAllTypes(data);
  const allNames = await getAllNames(data);
  const data_zh = data.map((item: any) => {
    const type = allTypes[item.type] || '未知类型';
    const sourceType = allTypes[item.sourceType] || '未知类型';
    const name = allNames[item.name] || item.name;
    return {
      ...item,
      type,
      name,
      sourceType,
    };
  });
  saveToJson(data_zh, 'prompts_zh.json');
  return data_zh;
}
// 翻译内容，一条一条翻译，翻译一条保存一条
async function translateContentOneByOne(data: any) {
  console.log('=====翻译内容=====');
  let index = 0;
  const { length } = data;
  while (index < length) {
    const item = data[index];
    console.log(`翻译第 ${index + 1} 条内容，共 ${length} 条`);
    console.log(`内容：${item.content}`);
    const content = await translateContent(item.content);
    console.log(`翻译结果：${content}`);
    
    data[index].content = content;
    saveToJson(data, 'prompts_zh.json');
    index++;
  }
}

(async () => {
  const data = getPromptsFiles();
  const data_zh = await formatData(data);
  await translateContentOneByOne(data_zh);
})();
