import React from 'react';
import { useRouter } from 'next/router';

interface VersionHeaderProps {
    productId: string;
    versionId: string;
    ticketId: string;
    title: string;
}

export default function VersionHeader ({ productId, versionId, ticketId, title }: VersionHeaderProps) {
    const router = useRouter()
    const handleTicketIdLabel = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}`)
    }
    const handleVersionLabel = () => {
        router.push(`/products/${productId}/${versionId}/`)
    }

    return (
        <header>
            <div className="flex items-center">
                <h1 className="text-4xl font-bold decoration-gray-400 text-gray-900">{productId}</h1>
                <span   className="bg-amber-500 text-sm text-gray-900 rounded-md px-2 py-1 ml-2 transition-colors duration-300 ease-in-out hover:bg-amber-400 cursor-pointer"
                        onClick={handleVersionLabel}
                >
                    {versionId}
                </span>
            </div>
            <div className="flex justify-between mt-2 mb-2">
                {title && <h2 className="text-2xl font-medium italic decoration-gray-700 text-gray-900">{title}</h2>}
                {ticketId && <h2    className="text-xl text-gray-900 decoration-gray-400 hover:underline cursor-pointer"
                                    onClick={handleTicketIdLabel}
                >
                    #{ticketId}
                </h2>}
            </div>
        </header>
        
    );
};
