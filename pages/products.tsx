import {useEffect, useState} from "react";
import ProductGridRow from "@/components/productGridRow";
import productsList from "@/components/productsMock";
import Breadcrumb from "@/components/breadcrumb";
import VersionHeader from "@/components/versionHeader";
import ProductTable from "@/components/compactTable/products/productTable";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-2 text-sm text-white bg-blue-950">{title}</th>
}

export default function Products() {
    const [list, setList] = useState([])

    useEffect(() => {  
    }, [])

    return (
    <>
        <Breadcrumb steps={[
            { name: "Productos", link: null }
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
