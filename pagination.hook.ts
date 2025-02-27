/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePage = (defaultPage = 1) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageParam = Number(searchParams.get("page"));
  const initialValue = isNaN(pageParam) ? defaultPage : pageParam;
  return useState(Math.max(initialValue, defaultPage));
};

const useSize = (defaultSize = 10) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sizeParam = Number(searchParams.get("size"));
  const initialValue = isNaN(sizeParam) ? defaultSize : sizeParam;
  return useState(Math.max(initialValue, defaultSize));
};

const useSearch = (defaultSearch = "") => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get("search") ?? defaultSearch;
  return useState(searchParam);
};

const usePagination = (
  defaultPage = 1,
  defaultSize = 10,
  defaultSearch = ""
) => {
  const [page, setPage] = usePage(defaultPage);
  const [size, setSize] = useSize(defaultSize);
  const [search, setSearch] = useSearch(defaultSearch);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(page));
    searchParams.set("size", String(size));
    if (search) searchParams.set("search", search);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }, [page, size, search, location.pathname, navigate]);

  return {
    page,
    size,
    search,
    setPage,
    setSize,
    setSearch,
  };
};

export default usePagination;
