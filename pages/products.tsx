import {useEffect, useState} from "react";
import productsList from "@/components/productsMock";
import Breadcrumb from "@/components/breadcrumb";
import ProductTable from "@/components/compactTable/products/productTable";
import Product from "@/types/product";
import TextButton from "@/components/button/textButton";
import Link from "next/link";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        // TODO: API call a backend para obtener productos
        setProducts(productsList)
    }, [])

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
            <div className="flex items-center justify-start gap-x-6 px-4">
                <Link href="/home">
                    <TextButton
                        name="Volver"
                        style="transparent" />
                </Link>
            </div>
        </div>
    </>
    )
}
