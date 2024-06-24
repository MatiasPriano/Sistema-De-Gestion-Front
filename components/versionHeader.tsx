import React from "react";
import { useRouter } from "next/router";

interface VersionHeaderProps {
  productId: string;
  versionId: string;
  ticketId: string;
  title: string;
}

export default function VersionHeader({
  productId,
  versionId,
  ticketId,
  title,
}: VersionHeaderProps) {
  const router = useRouter();
  const handleTicketIdLabel = () => {
    router.push(`/products/${productId}/${versionId}/${ticketId}`);
  };
  const handleVersionLabel = () => {
    router.push(`/products/${productId}/${versionId}/`);
  };

  return (
    <header>
      <div className="flex items-center">
        <h1 className="text-2xl py-2 sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1">
          {productId}
        </h1>
        <span
          className="bg-secondary text-sm shadow-md text-title rounded-md px-2 py-1 ml-2 transition-colors duration-300 ease-in-out hover:bg-secondaryHover cursor-pointer"
          onClick={handleVersionLabel}
        >
          {versionId}
        </span>
      </div>
      <div className="flex justify-between mt-2 mb-2">
        <h2 className="text-2xl font-medium italic text-title">{title}</h2>
        <h2
          className={`${ticketId ? "" : "hidden"} text-xl text-title hover:underline pr-2 cursor-pointer`}
          onClick={handleTicketIdLabel}
        >
          #{ticketId}
        </h2>
      </div>
    </header>
  );
}
