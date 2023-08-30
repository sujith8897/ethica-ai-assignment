import { useEffect, useRef } from "react";

export default function Modal({
  open = false,
  onClose = () => null,
  children = null,
}: {
  open: boolean;
  onClose: () => void;
  children: any;
}) {
  const contentRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (open) {
      // Attach the click event listener
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Remove the click event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return open ? (
    <div
      className="backdrop-blur fixed top-0 left-0 w-screen h-screen"
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center justify-center h-full w-full">
        <div
          ref={contentRef}
          className="min-w-[300px] md:min-w-[600px] min-h-[350px] md:min-h-[400px] bg-white rounded-md shadow-lg px-6 py-4 border border-gray-300"
        >
          <div className="flex justify-end">
            <svg
              width="24px"
              height="24px"
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#263238"
              className="cursor-pointer w-5 h-5"
              onClick={onClose}
            >
              <path
                d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                stroke="#263238"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          {children}
        </div>
      </div>
    </div>
  ) : null;
}
