import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Agent | Pulsar Agents',
  description: 'Interactive agent playground powered by Pulsar Agents',
  openGraph: {
    title: 'Agent Playground | Pulsar Agents',
    description: 'Interactive agent playground powered by Pulsar Agents',
    type: 'website',
  },
};

export default async function NewAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
