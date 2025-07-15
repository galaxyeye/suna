import { agentPlaygroundFlagFrontend } from '@/flags';
import { isFlagEnabled } from '@/lib/feature-flags';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Agent Conversation | Pulsar Agents',
  description: 'Interactive agent conversation powered by Pulsar Agents',
  openGraph: {
    title: 'Agent Conversation | Pulsar Agents',
    description: 'Interactive agent conversation powered by Pulsar Agents',
    type: 'website',
  },
};

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
