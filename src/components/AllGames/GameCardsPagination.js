import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const GameCardsPagination = ({ pagination, games, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPageNumber = () => {
    let apiRequestString = "";
    let page;
    let pageIndexes = {
      prevPageIndex: null,
      nextPageIndex: 2,
      activePageIndex: 1,
    }

    if (pagination.nextPage) {
      apiRequestString = pagination.nextPage;

      page = apiRequestString
        .split("&")
        .filter((item) => item.includes("page"));
      page = Number(page[0].split("page=")[1]);

      pageIndexes = {
        prevPageIndex: page - 2,
        nextPageIndex: page,
        activePageIndex: page - 1
      }
    }

    if (pagination.nextPage === null && Number(searchParams.get("page")) > 1) {
      pageIndexes = {
        prevPageIndex: Number(searchParams.get("page")) - 1,
        nextPageIndex: null,
        activePageIndex: Number(searchParams.get("page")),
      };
    } else if (pagination.nextPage === null && !searchParams.get("page")) {
      pageIndexes = {
        prevPageIndex: null,
        nextPageIndex: null,
        activePageIndex: null,
      }
    }
      return pageIndexes;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagination]);

  return (
    <>
      {isLoading === false && games.length > 0 && (
        <div className="pagination-wrapper">
          {pagination.prevPage && (
            <button
              className="pagination-control-button pagination-prev-page"
              onClick={() => {
                searchParams.set("page", getPageNumber().prevPageIndex);
                setSearchParams(searchParams);
              }}
            >
              Previous page
            </button>
          )}
          {getPageNumber().activePageIndex && getPageNumber().activePageIndex  === 1 && (
            <button className="pagination-active-button">1</button>
          )}
          {getPageNumber().activePageIndex && getPageNumber().activePageIndex  >= 2 && (
            <>
              <button
                className="pagination-first-page-button"
                onClick={() => {
                  searchParams.set("page", "1");
                  setSearchParams(searchParams);
                }}
              >
                1
              </button>
              {getPageNumber().activePageIndex && getPageNumber().activePageIndex > 2 && (
                <span className="pagination-dots">...</span>
              )}
              <button className="pagination-active-button">
                {getPageNumber().activePageIndex}
              </button>
            </>
          )}

          {pagination.nextPage && (
            <button
              className="pagination-control-button pagination-next-page"
              onClick={() => {
                searchParams.set("page", getPageNumber().nextPageIndex);
                setSearchParams(searchParams);
              }}
            >
              Next page
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default GameCardsPagination;
