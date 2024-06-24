import CompactTable from "../compactTable";
import VersionRow from "./versionRow";
import Version from "@/types/version";

export default function VersionTable({ versions }: { versions: Version[] }) {
  const headers = ["Nombre", "Version", "Acciones"];
  return (
    <CompactTable
      headerTitles={headers}
      rows={versions.map((product) => (
        <VersionRow version={product} />
      ))}
    />
  );
}
