import Header from "@/app/ui/home/header";
import Image from "next/image";
import LikedContent from "@/app/ui/liked/liked-content";

export const revalidate = 0;

const Liked = async () => {
  return (
    <section
      className="
        bg-neutral-900
        rounded-lg
        min-h-[100vh]
        h-full
        w-full
        overflow-hidden
      "
    >
      <Header>
        <div className="mt-20">
          <div className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-x-5
          "> 
            <div className="
              relative
              h-32
              w-32
              lg:h-44
              lg:w-44
            ">
              <Image
                fill
                alt="Playlist"
                className="object-cover"
                src="/images/liked.jpg"
              />
            </div>
            <div className="
              flex
              flex-col
              gap-y-2
              mt-4
              md:mt-0
            ">
              <p className="
                hidden
                md:block
                font-semibold
                text-sm
              ">
                Playlist
              </p>
              <h1 className="
                text-white
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-bold
              ">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent />
    </section>
  );
}
 
export default Liked;