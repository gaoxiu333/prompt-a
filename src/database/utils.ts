import fs from 'fs';
import { groupBy, map } from 'lodash-es';
import path from 'path';

import { Prompt } from '@/types/prompt';
import { formatString } from '@/utils/string';

function extractMarkdownContent(fileContent: string) {
  const markdownRegex = /```markdown\n([\s\S]*?)```/;
  const match = markdownRegex.exec(fileContent);

  if (!match) {
    return fileContent;
  }

  return match[1].trim();
}

function getMDXFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries.reduce<string[]>((allFiles, entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return [...allFiles, ...getMDXFiles(fullPath)];
    }
    if (['.mdx', '.md'].includes(path.extname(entry.name))) {
      return [...allFiles, fullPath];
    }
    return allFiles;
  }, []);

  return files;
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const extractedContent = extractMarkdownContent(rawContent);

  const promptsBasePath = path.join(
    process.cwd(),
    'src',
    'database',
    'prompts',
  );
  const relativePath = path.relative(promptsBasePath, path.dirname(filePath));
  const categories = relativePath === '' ? [] : relativePath.split(path.sep);

  return {
    content: extractedContent,
    categories: categories[0] || 'Uncategorized',
  };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { content, categories } = readMDXFile(file);
    const slug = path.basename(file, path.extname(file));

    return {
      slug,
      categories,
      content,
    };
  });
}

export function getPromptsFiles() {
  const result = getMDXData(
    path.join(process.cwd(), 'src', 'database', 'prompts'),
  );
  return formatPrompts(result);
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
/**
 * 格式化 prompts
 * 按照 categories 分组
 */

function formatPrompts(prompts: Prompt[]) {
  return groupBy(
    map(prompts, (prompt) => {
      return {
        ...prompt,
        categories: formatString(prompt.categories),
      };
    }),
    'categories',
  );
}
