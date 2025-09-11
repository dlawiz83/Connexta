function AuthCard({
  title,
  subTitle,
  children,
  width = "w-full",
  height = "h-auto",
  padding = "p-8",
}) {
  return (
    <div
      className={`${width} ${padding} ${height} bg-white rounded-2xl shadow-lg mt-5   `}
    >
      {title && (
        <h2 className="font-medium leading-none text-center text-[20px]">
          {title}
        </h2>
      )}
      {subTitle && (
        <h3 className="text-[15px] p-5 text-gray-500 text-center leading-none">
          {subTitle}
        </h3>
      )}
      {children}
    </div>
  );
}

export default AuthCard;
