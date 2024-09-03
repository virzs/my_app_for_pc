import { getWebsiteClassifyTree } from "@/services/tabs/website_classifty";
import { useRequest } from "ahooks";
import { Tabs } from "antd";
import { useState } from "react";
import { Desktop } from "zs_library";

const DesktopEditor = () => {
  const [list, setlist] = useState([]);

  const { data = [] } = useRequest(getWebsiteClassifyTree);

  return (
    <div className="flex w-full bg-white p-2 rounded">
      <div className="w-[200px] border-r">
        <Tabs
          size="small"
          items={data.map((i) => {
            return {
              label: i.name,
              key: i.name,
              children: (
                <div>
                  {i.children.map((j) => {
                    return <div key={j.name}>{j.name}</div>;
                  })}
                </div>
              ),
            };
          })}
        />
      </div>
      <Desktop
        className="h-[500px] bg-gray-50 flex-grow"
        enableCaching={false}
        list={list}
        onChange={(d) => {
          setlist(d);
        }}
      />
    </div>
  );
};

export default DesktopEditor;
