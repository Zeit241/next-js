'use client'

import type {ReactNode} from 'react'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({ children }: {
    children: ReactNode
}) => {
    console.log('THIS IS client ROOT')
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}