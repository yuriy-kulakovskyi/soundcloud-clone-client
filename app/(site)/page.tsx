import Header from "@/app/ui/home/header";
import ListItem from "@/app/ui/home/list-item";
import { Toaster } from "react-hot-toast";
import { getSongs } from "@/app/lib/data";
import PageContent from "@/app/ui/library/page-content";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <section className="
      bg-neutral-900
      rounded-lg
      h-screen
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              font-semibold
            "
          >
            Welcome back
          </h1>
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          ">
            <ListItem
              image="/images/liked.jpg"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest songs
          </h1>
        </div>
        <PageContent
          songs={songs}
        />
      </div>
    </section>
  );
};