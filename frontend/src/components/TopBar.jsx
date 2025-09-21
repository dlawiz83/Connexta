import { Bell } from "lucide-react";

function TopBar({
  title,

  padding = "px-4 py-2",
  width = "w-full",
  height = "h-16 ",
}) {
  return (
    <>
      <div
        className={`bg-white ${width} ${height} ${padding} flex flex-row justify-center items-center`}
      >
        {<h2 className="font-medium leading-none text-[16px] ">{title}</h2>}
        <div className="ml-auto">
          <Bell size={20} />
        </div>
      </div>
      <hr className="border-gray-300 dark:border-gray-700" />
    </>
  );
}

export default TopBar;
