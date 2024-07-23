import { getSongs } from "@/app/lib/data";
import Header from "@/app/ui/home/header";
import SearchInput from "@/app/ui/search/search-input";
import SearchLoader from "../ui/search/search-loader";

interface SearchProps {
  searchParams: {
    title: string;
  }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongs(searchParams.title);

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
      <Header
        className="
          from-bg-neutral-900
        "
      >
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchLoader title={searchParams.title} />
    </section>
  )
}

export default Search;