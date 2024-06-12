import {useEffect, useState} from "react";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Projects() {
    const [list, setList] = useState([])

    useEffect(() => {  
    }, [])

    return (
        <>
                {/* ACA EMPIEZA LA GRILLA */}
                
        </>
    )
}
