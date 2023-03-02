import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { CustomTypes } from '@/types/custom-types';
import { redirect } from 'next/navigation';

export default async function ProtectLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session: { user: CustomTypes } | null = await getServerSession(
    authOptions
  );
  if (!session) return redirect('/');
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
