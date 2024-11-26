import { PaginationProps } from "antd";
import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return { currentPage, onChange };
};