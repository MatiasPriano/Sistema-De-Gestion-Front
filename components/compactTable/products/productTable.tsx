import Product from "@/types/product"
import CompactTable from "../compactTable"
import ProductRow from "./productRow"

export default function ProductTable({ products }: { products: Product[] }) {
    const headers = ["Nombre", "Version", "Acciones"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={products.map((product) => (
                <ProductRow product={product} />
            ))} />
    )
}