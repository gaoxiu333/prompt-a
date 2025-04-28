import * as fs from 'fs/promises';
import * as path from 'path';

interface MarkdownFile {
    filePath: string;
    content: string;
}

async function readMarkdownFiles(directoryPath: string): Promise<MarkdownFile[]> {
    const markdownFiles: MarkdownFile[] = [];

    async function scanDirectory(currentPath: string) {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            
            if (entry.isDirectory()) {
                await scanDirectory(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                const content = await fs.readFile(fullPath, 'utf-8');
                markdownFiles.push({
                    filePath: fullPath,
                    content: content
                });
            }
        }
    }

    await scanDirectory(directoryPath);
    return markdownFiles;
}

async function main() {
    try {
        const promptsPath = path.join(__dirname, '..', 'src', 'database', 'prompts');
        const markdownFiles = await readMarkdownFiles(promptsPath);
        
        console.log(`找到 ${markdownFiles.length} 个 markdown 文件:`);
        for (const file of markdownFiles) {
            console.log(`\n文件路径: ${file.filePath}`);
            console.log(`内容预览: ${file.content.slice(0, 150)}...\n`);
        }
    } catch (error) {
        console.error('错误:', error);
    }
}

main();