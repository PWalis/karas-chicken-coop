"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const NoItemWithThatId: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/shop");
        }, 500);
    }, []);

    return (
        <div className="h-screen flex justify-center place-items-center">
            <h2 className="text-3xl text-black">No item with that ID redirecting to shop</h2>
        </div>
    );
}