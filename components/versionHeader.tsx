import React from 'react';

interface VersionHeaderProps {
    productId: string;
    versionId: string;
    ticketId: string;
    title: string;
}

export default function VersionHeader ({ productId, versionId, ticketId, title }: VersionHeaderProps) {
    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-4xl font-bold decoration-gray-400">{productId}</h1>
                <a href={`/products/${productId}/${versionId}/`}>
                    <span className="bg-amber-500 text-sm text-gray-900 rounded-md px-2 py-1 ml-2 transition-colors duration-300 ease-in-out hover:bg-amber-400">{versionId}</span>
                </a>
            </div>
            <div className="flex justify-between mt-2 mb-2">
                {title && <h2 className="text-xl decoration-gray-700">{title}</h2>}
                {ticketId && <h2 className="text-xl decoration-gray-400">#{ticketId}</h2>}
            </div>
        </div>
        
    );
};
