import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-150"
        >
          <BiChevronLeft />
        </button>
        <div className="hidden sm:flex">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 ${
                currentPage === index + 1 ? "font-bold bg-gray-100" : ""
              } focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-150`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="sm:hidden relative">
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="appearance-none w-full py-2 pl-3 pr-10 border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-150"
          >
            {[...Array(totalPages)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <FaAngleDown />
          </div>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-150"
        >
          <BiChevronRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
