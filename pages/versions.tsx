import { useEffect, useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import VersionTable from "@/components/compactTable/versions/versionTable";
import TextButton from "@/components/button/textButton";
import Link from "next/link";
import { getVersions } from "@/services/supportService";
import Version from "@/types/version";
import Loading from "@/components/loader";

export default function Versions() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getVersions().then((versions: Version[]) => {
      setVersions(versions);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {!isLoading && <Breadcrumb steps={[{ name: "Versiones", link: null }]} />}
      <div className="space-y-4">
        {!isLoading && <header className="flex items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1">
            Versiones
          </h1>
        </header>}
        {!isLoading && <VersionTable versions={versions} />}
        {isLoading && <Loading data="versiones"/>}
        <div className="flex items-center justify-start gap-x-6 px-4">
          <Link href="/home">
            <TextButton name="Volver" style="transparent" />
          </Link>
        </div>
      </div>
    </>
  );
}
