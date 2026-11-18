import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
import { Metadata } from 'next';
import { Agent } from '@gitroom/frontend/components/agents/agent';
import { AgentChat } from '@gitroom/frontend/components/agents/agent.chat';
export const metadata: Metadata = {
  title: `Agent | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Page() {
  return (
    <AgentChat />
  );
}
