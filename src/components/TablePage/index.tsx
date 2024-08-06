import {
  TabelRequestParams,
  TablePageInstance,
  TablePageOptions,
  useTablePage,
} from "@/hooks/useTablePage";
import { isMobileDevice } from "@/utils/utils";
import {
  ProCard,
  ProList,
  ProListProps,
  ProTable,
  ProTableProps,
} from "@ant-design/pro-components";
import { Service } from "ahooks/lib/useRequest/src/types";
import { renderEmptyToBarre } from "./utils";
import { ReactNode, useEffect, useMemo, useState } from "react";

export interface TablePageProps<T, U>
  extends Omit<ProTableProps<T, U>, "request">,
    Omit<
      ProListProps<T, U>,
      | "dataSource"
      | "footer"
      | "locale"
      | "onRow"
      | "pagination"
      | "rowClassName"
      | "size"
    >,
    TablePageOptions<T> {
  service?: Service<T, TabelRequestParams[]>;
  table?: TablePageInstance<T>;
  listFooter?: ProListProps<T, U>["footer"];
}

function TablePage<T extends object = any, U extends object = any>(
  props: TablePageProps<T, U>
) {
  const {
    service,
    table: tableProps,
    children,
    pagination,
    columns = [],
    rowSelection,
    rowKey,
    footer,
    listFooter,
    dataSource,
    size,
    locale,
    rowClassName,
    ...rest
  } = props;

  const [isMobile, setIsMobile] = useState(isMobileDevice());

  const table =
    tableProps ??
    useTablePage<T>(service ?? (async (): Promise<any> => {}), {
      ...rest,
    });

  const {
    total,
    data = [],
    loading,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    keyword,
    setKeyword,
    setKeywordStore,
    refresh,
    selectedRows,
    setSelectedRows,
    selectedRowKeys,
    setSelectedRowKeys,
    scrollTopIndex,
    setScrollTopIndex,
  } = table;

  const p = {
    loading,
    dataSource: data,
    pagination:
      pagination === false
        ? pagination
        : {
            pageSize,
            total,
            current,
            pageSizeOptions: [200, 1000, 3000, 5000, 10000],
            showSizeChanger: true,
            onChange: (page: number, size: number) => {
              if (size !== pageSize) {
                setCurrent(1);
                setPageSize(size);
                return;
              }
              setCurrent(page);
            },
          },
  };

  const l = (
    <ProList
      ghost
      cardProps={{
        ghost: true,
      }}
      footer={listFooter}
      renderItem={(data, index) => {
        // 根据 column 自动处理
        const title = columns[0]?.dataIndex
          ? (data as any)[columns[0].dataIndex as any]
          : "";
        const actions = columns.find(
          (i) =>
            i.dataIndex &&
            ["action", "operation"].includes(i.dataIndex?.toString())
        )?.render;

        return (
          <ProCard
            title={title}
            actions={
              actions?.(undefined, data, index, undefined, {
                type: "list",
                dataIndex: columns[0]?.dataIndex,
                title: columns[0]?.title,
              }) as ReactNode
            }
          >
            {columns
              .filter(
                (i) =>
                  !["action", "operation", undefined].includes(
                    i.dataIndex?.toString()
                  )
              )
              .slice(1)
              .map((column) => {
                const nowData = (data as any)[column.dataIndex as any];
                return (
                  <div>
                    {column.title}:{" "}
                    {column.render
                      ? column.render(nowData, data, index, undefined, {
                          type: "list",
                          dataIndex: column.dataIndex,
                          title: column.title,
                        })
                      : nowData}
                  </div>
                );
              })}
          </ProCard>
        );
      }}
      {...rest}
      {...p}
    />
  );

  const t = (
    <ProTable
      className="rounded-xl overflow-hidden"
      rowClassName={rowClassName}
      locale={locale}
      size={size}
      footer={footer}
      columns={columns.map((i) => ({
        ...i,
        search: i.search ?? false,
        render: i.render ?? renderEmptyToBarre,
      }))}
      search={{
        filterType: "light",
      }}
      defaultSize="middle"
      options={{
        density: false,
        setting: false,
        reload: () => {
          refresh();
        },
      }}
      virtual
      {...rest}
      {...p}
    />
  );

  // 监听窗口大小变化，切换表格类型
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return useMemo(() => (isMobile ? l : t), [isMobile]);
}

export default TablePage;
