import SideNav from "@/app/ui/authorization/side-nav"

export default function Layout({children}: {children: React.ReactNode}) {
  return(
    <section className="min-h-screen flex md:flex-row justify-between flex-col">
      <SideNav />
      <div className="md:w-[50%] md:h-screen
      w-[100%] min-h-[50vh]">{children}</div>
    </section>
  )
}