import { resourceR2List } from "@/services/resource";
import BaseListPage from "../components/baseListPage";
import { useTablePage } from "@/hooks/useTablePage";

const R2Page = () => {
  const table = useTablePage(resourceR2List);

  return <BaseListPage table={table}></BaseListPage>;
};

export default R2Page;
