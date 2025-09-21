function Button({
  children,
  onClick,
  type = "button",
  width = "w-20",
  height = "h-9",
  padding = "2px",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${width} ${height} ${padding} bg-black text-white rounded-md font-medium text-[13px]`}
    >
      {children}
    </button>
  );
}

export default Button;
