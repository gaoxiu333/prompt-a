import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import useLLMConfig from '../hooks/use-llm-config';

// TODO: 添加 api key，LLM 的一些配置，这样就值得一个弹窗了。

interface LLMApiKeyModalProps {
  children: React.ReactNode;
}

const LLMApiKeyModal = ({ children }: LLMApiKeyModalProps) => {
  const { llmApiKeys, form, onSubmit } = useLLMConfig();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>添加 API Key</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="xai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>XAI</FormLabel>
                  <FormControl>
                    <Input placeholder="XAI key" {...field} />
                  </FormControl>
                  <FormDescription>这是 XAI 的 API Key</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open AI</FormLabel>
                  <FormControl>
                    <Input placeholder="Open AI key" {...field} />
                  </FormControl>
                  <FormDescription>这是 Open AI 的 API Key</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deepseek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DeepSeek</FormLabel>
                  <FormControl>
                    <Input placeholder="DeepSeek key" {...field} />
                  </FormControl>
                  <FormDescription>这是 DeepSeek 的 API Key</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                取消
              </AlertDialogCancel>
              <Button type="submit" className="cursor-pointer">
                保存
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LLMApiKeyModal;
