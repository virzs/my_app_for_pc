import {
  addWebsite,
  getWebsiteDetail,
  parseWebsite,
  updateWebsite,
} from "@/services/tabs/website";
import { getWebsiteClassify } from "@/services/tabs/website_classifty";
import { baseFormItemLayout } from "@/utils/utils";
import {
  BetaSchemaForm,
  ProDescriptions,
  ProFormInstance,
} from "@ant-design/pro-components";
import { RiAddLine } from "@remixicon/react";
import { useRequest } from "ahooks";
import {
  Button,
  Card,
  Empty,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Space,
} from "antd";
import { FC, useEffect, useRef, useState } from "react";

export interface HandleModalProps {
  onFinished?: (values: any) => void;
  open?: boolean;
  editId?: string;
  onClose?: () => void;
  onDetailLoading?: (loading: boolean) => void;
}

const WebsiteHandle: FC<HandleModalProps> = (props) => {
  const { onFinished, open, editId, onClose, onDetailLoading } = props;

  const [parseModalOpen, setParseModalOpen] = useState(false);
  const [parseResult, setParseResult] = useState<any>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const ref = useRef<ProFormInstance<any>>(null);

  const { data, loading, run } = useRequest(getWebsiteDetail, {
    manual: true,
  });

  const handleUseParseResult = () => {
    if (!parseResult) return;
    ref.current?.setFieldsValue({
      ...parseResult,
      name: parseResult.title,
      icon: {
        name: selectedIcon?.split("/").pop(),
        url: selectedIcon,
      },
    });
    setParseModalOpen(false);
    setSelectedIcon(null);
    setParseResult(null);
  };

  const { loading: parseLoading, run: parseRun } = useRequest(parseWebsite, {
    manual: true,
    onSuccess: (res, [{ url }]) => {
      if (Object.keys(res ?? {}).length === 0) {
        message.error("解析失败");
        return;
      }

      const iconUrl = res.icon
        ? res.icon.startsWith("http")
          ? res.icon
          : new URL(res.icon, url).href
        : null;

      const iconUrls =
        res.icons?.map((item) => {
          return item.startsWith("http") ? item : new URL(item, url).href;
        }) ?? [];

      if (iconUrl && !iconUrls.includes(iconUrl)) {
        iconUrls.unshift(iconUrl);
      }

      if (iconUrls.length > 0) {
        setSelectedIcon(iconUrls[0]);
      }

      setParseResult({ ...res, icons: iconUrls });
      setParseModalOpen(true);
    },
    onError: () => {
      message.error("解析失败");
    },
  });

  useEffect(() => {
    if (editId) {
      run(editId);
    }
  }, [editId]);

  useEffect(() => {
    if (data) {
      ref.current?.setFieldsValue({
        ...data,
      } as any);
    }
  }, [data]);

  useEffect(() => {
    onDetailLoading?.(loading);
  }, [loading]);

  const reg = new RegExp(
    "^(https?|ftp|file):\\/\\/[\\w\\d\\-_]+(\\.[\\w\\d\\-_]+)+([\\w\\-.,@?^=%&:/~+#]*[\\w\\-@?^=%&/~+#])?$"
  );

  return (
    <>
      <BetaSchemaForm
        {...baseFormItemLayout}
        open={open}
        formRef={ref}
        layoutType="ModalForm"
        trigger={
          <Button type="primary" icon={<RiAddLine size={16} />}>
            新增网站
          </Button>
        }
        title={editId ? "修改网站" : "新增网站"}
        onOpenChange={(open) => {
          if (!open) {
            onClose?.();
          }
          ref.current?.resetFields();
        }}
        onFinish={(values) => {
          return new Promise((resolve) => {
            (editId ? updateWebsite(editId, values) : addWebsite(values))
              .then(() => {
                message.success(editId ? "修改成功" : "新增成功");
                onFinished?.(values);
                resolve(true);
                ref.current?.resetFields();
              })
              .catch(() => {
                resolve(false);
              });
          });
        }}
        modalProps={{
          destroyOnClose: true,
        }}
        columns={[
          {
            title: "分类",
            dataIndex: "classify",
            valueType: "treeSelect",
            request: async () => {
              const result = await getWebsiteClassify({});
              const disabledParent = (d: any[]): any[] => {
                // 如果父节点子节点不为空禁用
                return d.map((item: any) => {
                  if (item.children?.length) {
                    return {
                      ...item,
                      disabled: true,
                      children: disabledParent(item.children),
                    };
                  }
                  return item;
                });
              };
              return disabledParent(result);
            },
            fieldProps: {
              fieldNames: {
                label: "name",
                value: "_id",
              },
            },
          },
          {
            title: "URL",
            dataIndex: "url",
            valueType: "textarea",
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: "请输入URL",
                },
                {
                  pattern: reg,
                  message: "请输入正确的URL",
                },
              ],
            },
            renderFormItem: (_, config) => {
              const { value } = config;

              const isUrl = reg.test(value);

              return (
                <div className="flex gap-2">
                  <Input.TextArea {...config} />
                  <Button
                    disabled={!isUrl}
                    loading={parseLoading}
                    onClick={() => {
                      parseRun({ url: value });
                    }}
                  >
                    解析URL
                  </Button>
                </div>
              );
            },
          },
          {
            title: "名称",
            dataIndex: "name",
            valueType: "text",
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: "请输入名称",
                },
              ],
            },
          },
          {
            title: "描述",
            dataIndex: "description",
            valueType: "textarea",
          },
          {
            title: "图标",
            dataIndex: "icon",
            valueType: "upload",
            fieldProps: {
              dir: "website_icon",
              accept: "image/*",
              maxLength: 1,
            },
          },
          {
            title: "主题色",
            dataIndex: "themeColor",
            valueType: "color",
            formItemProps: {
              getValueFromEvent: (e: any) => {
                return e.toRgbString();
              },
            },
            fieldProps: {
              format: "rgb",
            },
          },
          {
            title: "是否启用",
            dataIndex: "enable",
            valueType: "switch",
            initialValue: true,
          },
          {
            title: "是否公开",
            dataIndex: "public",
            valueType: "switch",
            initialValue: false,
          },
        ]}
      ></BetaSchemaForm>
      <Modal
        title="解析成功"
        open={parseModalOpen}
        onCancel={() => {
          setParseModalOpen(false);
          setSelectedIcon(null);
          setParseResult(null);
        }}
        onOk={handleUseParseResult}
        okText="使用解析结果"
        cancelText="关闭"
        width={800}
      >
        <ProDescriptions
          dataSource={parseResult}
          columns={[
            {
              title: "标题",
              dataIndex: "title",
              span: 24,
            },
            {
              title: "描述",
              dataIndex: "description",
              span: 24,
            },
            {
              title: "图标",
              dataIndex: "icons",
              span: 24,
              render: (_, record) => {
                if (!record.icons?.length) return <Empty />;
                return (
                  <Radio.Group
                    className="w-full"
                    value={selectedIcon}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                  >
                    <Space direction="vertical" className="w-full">
                      {record.icons.map((item: string) => (
                        <Card className="w-full" key={item}>
                          <Radio value={item}>
                            <div className="flex items-center gap-2">
                              <div className="shrink-0">
                                <Image src={item} width={48} height={48} />
                              </div>
                              <p>{item}</p>
                            </div>
                          </Radio>
                        </Card>
                      ))}
                    </Space>
                  </Radio.Group>
                );
              },
            },
          ]}
        ></ProDescriptions>
      </Modal>
    </>
  );
};

export default WebsiteHandle;
