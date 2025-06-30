import React, { useState } from "react";
import { Pagination, Table } from "antd";
import { ArrowLeftIcon } from "../../assets/svgAssets";
import { TableSkeleton } from "../tableSkeleton";
import { EmptyContent } from "../emptyContent";

export const CustomTable = ({
  columns,
  data,
  loading,
  skeletonRows = 5,
  skeletonColumns = 4,
  pagination = true,
  scrollY = 350,
  onChange,
  tableHeight = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };
  if (loading)
    return <TableSkeleton rows={skeletonRows} columns={skeletonColumns} />;

  const paginatedData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (!data || data?.length <= 0) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: scrollY + 43 + 40 }}
      >
        <EmptyContent />
      </div>
    );
  }

  const selectedLanguage = localStorage.getItem("language");

  return (
    <div className={`w-full flex flex-col justify-between ${tableHeight}`}>
      <Table
        dataSource={pagination ? paginatedData : data}
        columns={columns}
        className="custom-table"
        pagination={false}
        scroll={{
          x: "max-content",
          y: data?.length * 53 > scrollY ? scrollY : undefined,
        }}
        rowClassName={() => "no-hover"}
        locale={{
          emptyText: <EmptyContent />,
        }}
        onChange={() => onChange && onChange()}
        tableLayout="fixed"
      />
      {pagination && data && data?.length > 0 && (
        <div className="pagination-container w-full pt-3 mt-3">
          <Pagination
            defaultCurrent={1}
            total={data?.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            itemRender={(page, type, originalElement) => {
              if (type === "prev") {
                return (
                  <button
                    variant="pagination"
                    pagination="prev"
                    className={`p-1 bg-white rounded-lg border border-neutral-500 size-10 flex items-center justify-center hover:bg-neutral-300 ${
                      selectedLanguage === "ur" ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ArrowLeftIcon />
                  </button>
                );
              }
              if (type === "next") {
                return (
                  <button
                    variant="pagination"
                    pagination="next"
                    className={`p-1 bg-white rounded-lg border border-neutral-500 size-10 flex items-center justify-center hover:bg-neutral-300 ${
                      selectedLanguage === "ur" ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <ArrowLeftIcon />
                  </button>
                );
              }
              if (type === "page") {
                return <button>{page}</button>;
              }
              if (type === "jump-next") {
                return (
                  <button>
                    <p>...</p>
                  </button>
                );
              }
              if (type === "jump-prev") {
                return (
                  <button>
                    <p>...</p>
                  </button>
                );
              }
              return originalElement;
            }}
          />
        </div>
      )}
    </div>
  );
};
