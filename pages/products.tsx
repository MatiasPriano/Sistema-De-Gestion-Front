import {useEffect, useState} from "react";
import productsList from "@/components/productsMock";
import Breadcrumb from "@/components/breadcrumb";
import ProductTable from "@/components/compactTable/products/productTable";

export default function Products() {
    return (
    <>
        <Breadcrumb steps={[
            { name: "Productos", link: null }
        ]} />
        <div className="space-y-4">
            <header className="flex items-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1">Productos</h1>
            </header>
            <ProductTable products={productsList} />
        </div>
    </>
    )
}
