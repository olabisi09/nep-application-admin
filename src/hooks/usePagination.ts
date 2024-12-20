import { useState } from "react";

import { PaginationProps } from "antd";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return { currentPage, onChange };
};