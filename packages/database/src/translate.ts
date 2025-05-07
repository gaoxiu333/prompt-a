/**
 * 翻译
 * 1. 翻译标题
 * 2. 翻译内容
 * 3. 翻译类型
 */
import { xai } from '@ai-sdk/xai';
import { generateText } from 'ai';

// 翻译标题
export async function translateTitle(title: string) {
  const result = await generateText({
    model: xai('grok-3-beta'),
    system: '你是一个翻译助手，负责将英文翻译为中文。并且保留原格式。',
    prompt: title,
    temperature: 0,
  });
  return JSON.parse(result.text);
}
// 翻译内容
export async function translateContent(content: string) {
  const result = await generateText({
    model: xai('grok-3-beta'),
    system:
      '你是一个提示词工程专家，负责将英文的提示词翻译为中文提示词，翻译准确的同时保留原提示词的技巧性能。并且保留原格式。',
    prompt: content,
    temperature: 0,
  });
  return result.text;
}
// 翻译类型
export async function translateType(type: string) {
  const result = await generateText({
    model: xai('grok-3-beta'),
    system: '你是一个翻译助手，负责将英文翻译为中文。并且保留原格式。',
    prompt: type,
    temperature: 0,
  });
  return JSON.parse(result.text);
}
