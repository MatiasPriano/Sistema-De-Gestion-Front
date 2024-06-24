export default function ResourceCell({ name }: { name: string | undefined }) {
  const resourceDefined = name != undefined;
  return (
    <div className="flex items-center">
      {resourceDefined && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-2 flex-shrink-0 text-title"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      )}
      <div
        className="line-clamp-1 text-sm mx-2 text-title font-medium"
        title={name}
      >
        {resourceDefined ? name : "Sin definir"}
      </div>
    </div>
  );
}
