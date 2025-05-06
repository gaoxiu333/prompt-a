import PromptLayout from './_components/prompt-layout';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <PromptLayout>{children}</PromptLayout>;
};

export default RootLayout;
