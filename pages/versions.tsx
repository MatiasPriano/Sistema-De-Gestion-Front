import {useEffect, useState} from "react";
import Breadcrumb from "@/components/breadcrumb";
import VersionTable from "@/components/compactTable/products/versionTable";
import TextButton from "@/components/button/textButton";
import Link from "next/link";
import { getVersions } from "@/services/supportService";
import Version from "@/types/version";

export default function Versions() {
    const [versions, setVersions] = useState<Version[]>([])

    useEffect(() => {
        getVersions().then((versions: Version[]) => {
            setVersions(versions)
        })
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
            <VersionTable versions={versions} />
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
