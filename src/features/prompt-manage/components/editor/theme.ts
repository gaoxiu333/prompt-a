import { formatHex, parse } from 'culori';
import { editor, type languages } from 'monaco-editor';

const style = getComputedStyle(document.body);

function colorFromProperty(property: string): string {
  const oklch = style.getPropertyValue(property);

  if (!oklch) {
    return '#000000';
  }
  const color = parse(oklch);
  const hex = formatHex(color);

  return hex as string;
}

export const recalculateColors = () => ({
  primary: colorFromProperty('--primary'),
  primaryForeground: colorFromProperty('--primary-foreground'),
  secondary: colorFromProperty('--secondary'),
  secondaryForeground: colorFromProperty('--secondary-foreground'),
  foreground: colorFromProperty('--foreground'),
  accentForeground: colorFromProperty('--accent-foreground'),
  destructive: colorFromProperty('--destructive'),
  destructiveMutedForeground: colorFromProperty(
    '--destructive-muted-foreground',
  ),
  mutedForeground: colorFromProperty('--muted-foreground'),
});

export type ThemeColors = ReturnType<typeof recalculateColors>;

export const tokenizer = {
  root: [
    // Escaped sequences
    [/\\\{\{/, 'text'],
    [/\\</, 'text'],
    [/\\\/\*/, 'text'],

    // YAML initial config
    [/^---$/, { token: 'yaml-delimiter', next: '@yaml' }],

    // Multiline comments
    [/\/\*/, { token: 'comment', next: '@comment' }],

    // Embedded JavaScript logic
    [/\{\{/, { token: 'js-open', next: '@js' }],

    // HTML-like tags
    [/<[\w-]+/, { token: 'tag-open', next: '@tag' }],
    [/<\/[\w-]+/, { token: 'tag-open', next: '@tag' }],

    // Markdown-like syntax
    [/#.*$/, 'header'],
    [/\*\*[^*]+\*\*/, 'bold'],
    [/\*[^*]+\*/, 'italic'],
    [/\[[^\]]+\]\([^)]+\)/, 'link'],
  ],

  yaml: [
    [/^---$/, { token: 'yaml-delimiter', next: '@pop' }],
    [/[^]+/, 'yaml'],
  ],

  comment: [
    [/\*\//, { token: 'comment', next: '@pop' }],
    [/[^*]+/, 'comment'],
    [/./, 'comment'],
  ],

  tag: [
    [/>/, { token: 'tag-close', next: '@pop' }],
    [/[\w-]+=/, { token: 'attribute.name', next: '@tagAttribute' }],
    [/[\w-]+/, 'attribute.name'],
    [/\s+/, { token: '' }],
  ],

  tagAttribute: [
    [/\{\{/, { token: 'js-open', next: '@js' }],
    [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-terminated string
    [/"/, 'attribute.quote', '@attribute_string'], // tokenize opening quote
    [/\s+/, { token: '', next: '@pop' }],
    [/>/, { token: 'tag-close', next: '@popall' }],
  ],

  attribute_string: [
    [/\{\{/, { token: 'js-open', next: '@js' }],
    [/[^\\"]+/, 'attribute.value'],
    [/\\./, 'string.escape'],
    [/"/, 'attribute.quote', '@pop'], // tokenize closing quote
  ],

  string_double: [
    [/[^\\"]+/, 'string'],
    [/\\./, 'string.escape'],
    [/"/, 'string', '@pop'],
  ],

  string_single: [
    [/[^\\']+/, 'string'],
    [/\\./, 'string.escape'],
    [/'/, 'string', '@pop'],
  ],

  string_backtick: [
    [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
    [/[^\\`]+/, 'string'],
    [/\\./, 'string.escape'],
    [/`/, 'string', '@pop'],
  ],

  js: [
    [/\}\}/, { token: 'js-close', next: '@pop' }],

    // equal
    [/=/, 'delimiter.equal'],

    // whitespace
    { include: '@whitespace' },

    // control structures
    [/(#|\/|:)([a-zA-Z_]\w*)/, ['control-symbol', 'control-word']],

    // identifiers and keywords
    [/[a-z_$][\w$]*/, 'identifier'],

    // numbers
    [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
    [/0[xX][0-9a-fA-F]+/, 'number.hex'],
    [/\d+/, 'number'],

    // strings
    [/"([^"\\]|\\.)*$/, 'js-string.invalid'], // non-terminated string
    [/'([^'\\]|\\.)*$/, 'js-string.invalid'], // non-terminated string
    [/"/, 'js-string', '@js_string_double'],
    [/'/, 'js-string', '@js_string_single'],
    [/`/, 'js-string', '@js_string_backtick'],

    // delimiters and operators
    [/[{}[\]()]/, '@bracket'],
    [/[<>](?![[=><!~?:&|+\-*/^%]+])/, 'delimiter'],
    [/[<>]=?/, 'delimiter'],
    [/!=?=?/, 'delimiter'],
    [/[=+\-*/^%&|!~?:]/, 'delimiter'],
  ],

  js_string_double: [
    [/[^\\"]+/, 'js-string'],
    [/\\./, 'string.escape'],
    [/"/, 'js-string', '@pop'],
  ],

  js_string_single: [
    [/[^\\']+/, 'js-string'],
    [/\\./, 'string.escape'],
    [/'/, 'js-string', '@pop'],
  ],

  js_string_backtick: [
    [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
    [/[^\\`]+/, 'js-string'],
    [/\\./, 'string.escape'],
    [/`/, 'js-string', '@pop'],
  ],

  bracketCounting: [
    [/\{/, 'delimiter.bracket', '@bracketCounting'],
    [/\}/, 'delimiter.bracket', '@pop'],
    { include: 'js' },
  ],

  whitespace: [
    [/[ \t\r\n]+/, ''],
    [/\/\*/, 'comment', '@comment'],
    [/\/\/.*$/, 'comment'],
  ],
} as { [key: string]: languages.IMonarchLanguageRule[] };

export const options = {
  fixedOverflowWidgets: true,
  lineDecorationsWidth: 0,
  padding: {
    top: 16,
    bottom: 16,
  },
  lineNumbers: 'on',
  lineNumbersMinChars: 3,
  minimap: {
    enabled: true,
  },
  copyWithSyntaxHighlighting: false,
  cursorSmoothCaretAnimation: 'on',
  occurrencesHighlight: 'off',
  renderLineHighlight: 'none',
  wordWrap: 'off',
  tabSize: 2,
  readOnly: false,
  readOnlyMessage: undefined,
} as editor.IEditorOptions;
