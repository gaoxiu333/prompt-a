import data from './prompts_zh.json';

// TODO: 需要 tag 么？标签化？
export interface PromptTreeItem {
  name: string;
  title: string;
  content: string;
  children?: PromptTreeItem[];
  type: 'file' | 'folder';
}

interface PromptData {
  name: string;
  tags: string[];
  type: string;
  sourceType: string;
  content: string;
  path: string;
}

export function getPromptsFiles() {
  return formatPromptsToTree(data);
}

/**
 * 格式化 prompts
 * 按照 categories 分组
 */

function formatPromptsToTree(prompts: PromptData[]) {
  const root: PromptTreeItem = {
    name: 'root',
    type: 'folder',
    title: '根目录',
    content: '',
    children: [],
  };

  // 遍历每个 prompt
  prompts.forEach((prompt) => {
    let currentNode = root;

    // 遍历分类路径创建文件夹结构
    prompt.tags.forEach((category) => {
      // 查找是否已存在该分类节点
      let found = currentNode.children?.find(
        (child) => child.name === category,
      );

      if (!found) {
        // 如果不存在则创建新的文件夹节点
        const newNode: PromptTreeItem = {
          name: category,
          type: 'folder',
          title: prompt.name,
          content: prompt.content,
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
      name: prompt.name,
      title: prompt.name,
      content: prompt.content,
      type: 'file',
    };

    currentNode.children = currentNode.children || [];
    currentNode.children.push(fileNode);
  });

  return root;
}
