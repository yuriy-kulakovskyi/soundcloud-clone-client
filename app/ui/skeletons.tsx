const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function MediaItemSkeleton() {
  return (
    <li className={shimmer + " flex items-center gap-x-3 w-full p-2 rounded-md animate-pulse"}>
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden bg-neutral-700" />
      <div className="flex flex-col gap-y-1 overflow-hidden w-full">
        <div className="h-4 bg-neutral-700 rounded-lg w-3/4" />
        <div className="h-3 bg-neutral-700 rounded-lg w-1/2 mt-1" />
      </div>
    </li>
  );
}

export function LibrarySongsSkeleton() {
  return (
    <ul className="w-full flex flex-col gap-y-2 mt-4 px-3">
      <MediaItemSkeleton />
      <MediaItemSkeleton />
      <MediaItemSkeleton />
      <MediaItemSkeleton />
      <MediaItemSkeleton />
    </ul>
  );
}

export function UploaderSkeleton() {
  return (
    <span className={shimmer + " rounded-md bg-neutral-700 p-2 w-full"}></span>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="mb-2 flex flex-col gap-y-6 animate-pulse">
      <div className="h-8 bg-neutral-700 rounded-lg w-1/3"></div>
      <div className="h-10 bg-neutral-700 rounded-lg w-full"></div>
    </div>
  );
}

export function SearchContentSkeleton() {
  return (
    <div className="flex flex-col gap-y-4 mt-4 px-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-[50px] bg-neutral-700 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );
}

export function SearchPageSkeleton() {
  return (
    <section
      className="
        bg-neutral-900
        rounded-lg
        h-full
        min-h-[100vh]
        w-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <SearchContentSkeleton />
    </section>
  );
}

export function SongItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-32 bg-neutral-700 rounded-lg mb-2"></div>
      <div className="h-4 bg-neutral-700 rounded-lg w-3/4 mb-2"></div>
      <div className="h-4 bg-neutral-700 rounded-lg w-1/2"></div>
    </div>
  );
}

export function PageContentSkeleton() {
  return (
    <ul
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
      "
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index}>
          <SongItemSkeleton />
        </li>
      ))}
    </ul>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center p-6 bg-gradient-to-b from-orange-800">
        <div className="flex gap-x-2 items-center">
          <div className="w-10 h-10 bg-neutral-700 rounded-full"></div>
          <div className="w-10 h-10 bg-neutral-700 rounded-full"></div>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="w-10 h-10 bg-neutral-700 rounded-full"></div>
          <div className="w-10 h-10 bg-neutral-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
