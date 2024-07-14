import NavLinks from "@/app/ui/authorization/nav-links";

const SideNav:React.FC = () => {
  return (
    <div className="
      md:w-[50%] md:h-screen
      w-[100%] min-h-[50vh]
    ">
      <NavLinks />
    </div>
  );
}

export default SideNav;