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
import { ReactNode, useEffect, useState } from "react";
import { css } from "@emotion/css";

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
    size = "small",
    locale,
    rowClassName,
    search,
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
    refresh,
    setSelectedRows,
    selectedRowKeys,
    setSelectedRowKeys,
    runAsync,
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
      className={css`
        .ant-pro-table-list-toolbar {
          &-container {
            padding-top: 0;
          }
        }
        .ant-list {
          min-height: 0;
          .ant-spin-nested-loading {
            height: calc(100% - 44px);
            flex-grow: 1;
            .ant-spin-container {
              height: 100%;
            }
          }
          .ant-list-items {
            overflow-y: auto;
          }
        }
        .ant-list-pagination {
          margin-top: 12px;
          flex-shrink: 0;
        }
      `}
      rowKey="_id"
      rowSelection={{
        columnWidth: 50,
        selectedRowKeys,
        onChange: (keys, rows) => {
          setSelectedRows(rows);
          setSelectedRowKeys(keys);
        },
        ...rowSelection,
      }}
      tableAlertRender={false}
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
            className="mb-2"
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
                      : nowData instanceof Object
                      ? nowData?.name ?? nowData?.title ?? nowData?.label
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

  const showSearch = columns.some((i) => i.search);

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
      search={
        showSearch && {
          ...search,
        }
      }
      defaultSize="middle"
      options={{
        density: false,
        setting: false,
        reload: () => {
          refresh();
        },
      }}
      virtual
      rowKey="_id"
      rowSelection={{
        columnWidth: 50,
        selectedRowKeys,
        onChange: (keys, rows) => {
          setSelectedRows(rows);
          setSelectedRowKeys(keys);
        },
        ...rowSelection,
      }}
      tableAlertRender={false}
      request={async (params) => {
        const { current, pageSize, ...rest } = params;
        return runAsync({ ...rest, page: current, pageSize });
      }}
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

  return isMobile ? l : t;
}

export default TablePage;
