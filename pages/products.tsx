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
        <header className="flex items-center">
            <h1 className="text-2xl sm:text-4xl font-bold decoration-gray-400 text-gray-900 line-clamp-2 sm:line-clamp-1">Productos</h1>
        </header>
        <ProductTable products={productsList} />
        {/* <div className="container max-w-7xl mx-auto mt-8">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className='rounded-xl border border-blue-950 overflow-hidden'>
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <HeaderItem title="Nombre" />
                                <HeaderItem title="Versión" />
                                <HeaderItem title="Tickets asociados" />
                                <HeaderItem title="Crear ticket" />
                            </tr>
                            </thead>

                            <tbody>
                            {productsList.map(product => (
                                <ProductGridRow key={product.name} product={product} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div> */}
    </>
    )
}
