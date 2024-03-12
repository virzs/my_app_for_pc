import {
  TabelRequestParams,
  TablePageInstance,
  TablePageOptions,
  useTablePage,
} from "@/hooks/useTablePage";
import { isMobileDevice } from "@/utils/utils";
import {
  ProList,
  ProListProps,
  ProTable,
  ProTableProps,
} from "@ant-design/pro-components";
import { Service } from "ahooks/lib/useRequest/src/types";
import { renderEmptyToBarre } from "./utils";

export interface TablePageProps<T, U>
  extends ProTableProps<T, U>,
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

    pagination: {
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

  const l = <ProList footer={listFooter} {...rest} {...p} />;

  const t = (
    <ProTable
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
      }}
      {...rest}
      {...p}
    />
  );

  return isMobileDevice() ? l : t;
}

export default TablePage;
