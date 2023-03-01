"use client"
import {signOut } from "next-auth/react"

export default function Protected() {
    return (
        <main>
            <h1>This is protected page</h1>
            <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>LOGOUT</button>
        </main>
    )
}
