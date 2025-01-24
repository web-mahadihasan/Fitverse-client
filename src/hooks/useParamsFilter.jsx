import { useCallback } from "react";
import { useSearchParams } from "react-router";


const useParamsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const currentPage = parseInt(searchParams.get("page") || "1"); 

  const setFilters = useCallback(
    (filters) => {
      const newParams = new URLSearchParams(searchParams); // Clone existing params

      if (filters.search !== undefined) {
        newParams.set("search", filters.search);
      }
      if (filters.sort !== undefined) {
        newParams.set("sort", filters.sort);
      }
      if (filters.currentPage !== undefined) {
        newParams.set("page", filters.currentPage);
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );
  const clearFilters = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])


  return {
    search,
    sort,
    currentPage,
    setFilters,
    clearFilters
  };
};

export default useParamsFilter;
