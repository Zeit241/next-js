"use client"
import {redirect} from "next/navigation";

export default function NotFound() {
    return (
        <>
            <h2>OOPS! SORRY BUT HERE WE GOT NOTHING</h2>
            <p>If u want to get back press button below</p>
            <button onClick={()=>redirect("/")}>Go back</button>
        </>
    );
}