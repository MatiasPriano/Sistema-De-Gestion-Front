import Link from "next/link"
import { useState } from "react"

function BreadcrumbHome() {
    return (
        <Link href="/home/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </Link>
    )
}

function BreadcrumbArrow() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    )
}

function BreadcrumbLink({ step } : { step: BreadcrumbStep }) {
    return (
        <div>
            {(step.link !== null) && (
                <Link href={step.link} className="truncate hover:underline" title={step.name}>
                    {step.name}
                </Link>)
            }
            {step.link === null && (
                <div className="truncate">
                    {step.name}
                </div>
            )}
        </div>
        
    )
}

export interface BreadcrumbStep {
    name: string
    link: string | null
}

export default function Breadcrumb({ steps }: { steps: BreadcrumbStep[] }) {
    const [showFullBreadcrumb, setShowFullBreadcrumb] = useState(false);

    const toggleFullBreadcrumb = () => {
        setShowFullBreadcrumb(!showFullBreadcrumb);
    };

    return (
        <div className="flex items-center space-x-2 pb-4">
            <BreadcrumbHome />
            <BreadcrumbArrow />
            <div className="hidden sm:flex items-center space-x-2">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <BreadcrumbLink step={step} />
                        {index < steps.length - 1 && <BreadcrumbArrow />}
                    </div>
                ))}
            </div>
            <div className="flex sm:hidden items-center space-x-2 relative">
                <div onClick={toggleFullBreadcrumb} className="cursor-pointer bg-gray-200 rounded-xl px-1">...</div>
                <BreadcrumbArrow />
                <BreadcrumbLink step={steps[steps.length - 1]} />
                {showFullBreadcrumb && (
                    <div className="absolute top-6 left-0 bg-white border rounded-md shadow-lg z-10">
                        {steps.slice(0, -1).map((step, index) => (
                            <div key={index} className="flex flex-col overflow-hidden border-b border-gray-300 items-start p-2 space-y-2">
                                <BreadcrumbLink step={step} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}