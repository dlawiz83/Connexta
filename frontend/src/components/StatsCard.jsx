function StatsCard({ title, count }) {
  return (
    <div>
      <div className="bg-white flex flex-col gap-6 rounded-xl border">
        <div className=" p-4 gap-2 flex justify-items-start flex-col ">
          <h1 className="text-gray-500 text-[13px]">{title}</h1>
          <h1 className="font-medium text-[15]">{count}</h1>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
