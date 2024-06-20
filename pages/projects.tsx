
import {useEffect, useState} from "react";
import productsList from "@/components/productsMock";
import Breadcrumb from "@/components/breadcrumb";
import ProductTable from "@/components/compactTable/products/productTable";


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
        <Breadcrumb steps={[
            { name: "", link: null }
        ]} />
        <div className="space-y-4">
            <header className="flex items-center">
                <h1 className="text-2xl sm:text-4xl font-bold decoration-gray-400 text-gray-900 line-clamp-2 sm:line-clamp-1">Productos</h1>
            </header>
            <ProductTable products={productsList} />
        </div>
    </>
                 
    )
}
