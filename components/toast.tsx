import React from 'react';

interface ToastProps {
    message: string;
    variant: string;
    onClose?: () => void;
}

export default function Toast({ message, variant, onClose }: ToastProps) {
    let toastClass = "fixed bottom-20 left-0 right-0 mx-auto max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg z-50";
    let iconClass = "flex-shrink-0 h-5 w-5 mr-3";

    let icon = null;
    switch (variant) {
        case "success":
            toastClass += " dark:bg-green-500 dark:border-green-700";
            iconClass += " text-green-500";
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            );
            break;
        case "error":
            toastClass += " dark:bg-red-500 dark:border-red-700";
            iconClass += " text-red-500";
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            );
            break;
        case "warning":
            toastClass += " dark:bg-yellow-500 dark:border-yellow-700";
            iconClass += " text-yellow-500";
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-.01 4h.01M12 4.586l.707-.707a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 12 12 9.414 9.414 12l2.293 2.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 14.586l2.586 2.586 1.414-1.414L13.414 13l2.293-2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 18l-2.293 2.293-1.414-1.414L13.414 17l-2.293-2.293a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L12 13.414 9.414 16l-1.414-1.414L10.586 12 7.293 8.707l-1.414 1.414L9.414 12l-2.293 2.293a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0L12 4.586z" />
                </svg>
            );
            break;
        default:
            break;
    }

    return (
        <div className={toastClass} role="alert">
            <div className="flex items-center p-4">
                <div className={iconClass}>{icon}</div>
                <div className="text-sm text-gray-700 dark:text-neutral-400">{message}</div>
                {onClose && (
                    <button onClick={onClose} className="ml-auto outline-none focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 dark:text-neutral-300 hover:text-gray-700 dark:hover:text-neutral-100 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.646 2.646a.5.5 0 0 1 .708 0l14.001 14a.5.5 0 0 1-.708.708l-14.001-14a.5.5 0 0 1 0-.708z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M16.646 2.646a.5.5 0 0 0-.708 0l-14 14a.5.5 0 0 0 .708.708l14-14a.5.5 0 0 0 0-.708z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
