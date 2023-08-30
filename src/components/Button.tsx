export default function Button({
  text = "Button",
  onClick = () => null,
  isLoading = false,
}: {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
}) {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`${
        isLoading
          ? "opacity-60 cursor-not-allowed"
          : "opacity-100 active:scale-95"
      } px-4 py-2 text-sm font-medium bg-black text-white rounded transition-all duration-100`}
    >
      <div className="flex items-center space-x-2">
        <p>{text}</p>
        {isLoading && (
          <svg
            width="24px"
            height="24px"
            strokeWidth="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#fff"
            className="w-4 h-4 animate-spin"
          >
            <path
              d="M21.168 8A10.003 10.003 0 0012 2C6.815 2 2.55 5.947 2.05 11"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M17 8h4.4a.6.6 0 00.6-.6V3M2.881 16c1.544 3.532 5.068 6 9.168 6 5.186 0 9.45-3.947 9.951-9"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7.05 16h-4.4a.6.6 0 00-.6.6V21"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}
      </div>
    </button>
  );
}
