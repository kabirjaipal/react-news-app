import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageSize = 10; // Number of page buttons to show at a time

  // Calculate the total number of page groups
  const totalPageGroups = Math.ceil(totalPages / pageSize);

  // Calculate the current page group
  const currentPageGroup = Math.ceil(currentPage / pageSize);

  // Calculate the start and end pages for the current page group
  const startPage = (currentPageGroup - 1) * pageSize + 1;
  const endPage = Math.min(currentPageGroup * pageSize, totalPages);

  return (
    <div className="pagination-container overflow-x-hidden">
      <div className="flex flex-col items-center mt-8 sm:flex-row sm:justify-center">
        <nav className="flex items-center space-x-4">
          {currentPageGroup > 1 && (
            <button
              onClick={() => handlePageChange(startPage - 1)}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-150"
            >
              <BiChevronLeft />
            </button>
          )}
          <div className="hidden sm:flex">
            {[...Array(pageSize)].map((_, index) => {
              const page = startPage + index;
              if (page <= endPage) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 ${
                      currentPage === page ? "font-bold bg-gray-100" : ""
                    } focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-150`}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}
          </div>
          {currentPageGroup < totalPageGroups && (
            <button
              onClick={() => handlePageChange(endPage + 1)}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 transition ease-in-out duration-150"
            >
              <BiChevronRight />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
