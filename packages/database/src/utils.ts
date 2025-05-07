import fs from 'fs';
import path from 'path';

export interface Prompt {
  slug: string;
  categories: string[];
  content: string;
  metadata?: {
    title?: string;
    summary?: string;
    publishedAt?: string;
  };
}
interface PromptItem {
  name: string;
  tags: string[];
  type: string;
  sourceType: string;
  content: string;
  path: string;
}

export interface PromptsByCategory {
  [category: string]: {
    [slug: string]: Prompt;
  };
}

// TODO: 需要 tag 么？标签化？
export interface PromptTreeItem {
  name: string;
  children?: PromptTreeItem[];
  type: 'file' | 'folder';
}

function extractMarkdownContent(fileContent: string) {
  let title = '',
    content = fileContent;
  const titleRegex = /#\s*(.*)/;
  const titleMatch = titleRegex.exec(fileContent);
  if (titleMatch) {
    const _title = titleMatch[1]!.trim();
    fileContent = fileContent.replace(titleRegex, '');
    title = _title.replace(/#/g, '').trim();
  }
  const markdownRegex = /```markdown\n([\s\S]*?)```/;
  const match = markdownRegex.exec(fileContent);

  if (match) {
    content = match[1]!.trim();
  }

  return {
    title,
    content,
  };
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
  const { title, content } = extractMarkdownContent(rawContent);

  const promptsBasePath = path.join(process.cwd(), 'prompts');
  const relativePath = path.relative(promptsBasePath, path.dirname(filePath));
  const tags = relativePath === '' ? [] : relativePath.split(path.sep);
  const type = tags.at(-1);
  const sourceType = tags.at(-2) || type;

  return {
    name: title,
    content,
    tags: tags,
    type,
    sourceType,
    path: relativePath,
  } as PromptItem;
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const {
      content,
      name,
      tags,
      type,
      sourceType,
      path: path_name,
    } = readMDXFile(file);
    const fileName = path.basename(file, path.extname(file));

    return {
      name: name || fileName,
      tags,
      type,
      sourceType,
      content,
      path: path_name,
    } as PromptItem;
  });
}

export function getPromptsFiles() {
  const result = getMDXData(path.join(process.cwd(), 'prompts'));
  return result;
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

function formatPromptsToTree(prompts: Prompt[]) {
  const root: PromptTreeItem = {
    name: 'root',
    type: 'folder',
    children: [],
  };

  // 遍历每个 prompt
  prompts.forEach((prompt) => {
    let currentNode = root;

    // 遍历分类路径创建文件夹结构
    prompt.categories.forEach((category) => {
      // 查找是否已存在该分类节点
      let found = currentNode.children?.find(
        (child) => child.name === category,
      );

      if (!found) {
        // 如果不存在则创建新的文件夹节点
        const newNode: PromptTreeItem = {
          name: category,
          type: 'folder',
          children: [],
        };
        currentNode.children = currentNode.children || [];
        currentNode.children.push(newNode);
        found = newNode;
      }

      currentNode = found;
    });

    // 添加文件节点
    const fileNode: PromptTreeItem = {
      name: prompt.slug,
      type: 'file',
    };

    currentNode.children = currentNode.children || [];
    currentNode.children.push(fileNode);
  });

  return root;
}
