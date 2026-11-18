import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
import { Metadata } from 'next';
import { Agent } from '@gitroom/frontend/components/agents/agent';
export const metadata: Metadata = {
  title: `Agents | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Agent>{children}</Agent>;
}
