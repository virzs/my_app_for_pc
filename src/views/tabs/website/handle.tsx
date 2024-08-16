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
import { useRequest } from "ahooks";
import { Button, Empty, Image, Input, message, Modal } from "antd";
import { FC, useEffect, useRef } from "react";

export interface HandleModalProps {
  onFinished?: (values: any) => void;
  open?: boolean;
  editId?: string;
  onClose?: () => void;
  onDetailLoading?: (loading: boolean) => void;
}

const { useModal } = Modal;

const WebsiteHandle: FC<HandleModalProps> = (props) => {
  const { onFinished, open, editId, onClose, onDetailLoading } = props;

  const [modal, contextHolder] = useModal();

  const ref = useRef<ProFormInstance<any>>();

  const { data, loading, run } = useRequest(getWebsiteDetail, {
    manual: true,
  });

  const { loading: parseLoading, run: parseRun } = useRequest(parseWebsite, {
    manual: true,
    onSuccess: (res, [{ url }]) => {
      if (Object.keys(res ?? {}).length === 0) {
        message.error("解析失败");
        return;
      }
      //   判断图标是否以http / https 开头
      const iconUrl = res.icon
        ? res.icon.startsWith("http")
          ? res.icon
          : `${url}${res.icon}`
        : null;

      modal.confirm({
        title: "解析成功",
        content: (
          <ProDescriptions
            dataSource={{ ...res, icon: iconUrl }}
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
                dataIndex: "icon",
                span: 24,
                render: (_) => {
                  return iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt="icon"
                      style={{ width: 48, height: 48 }}
                    />
                  ) : (
                    <Empty />
                  );
                },
              },
            ]}
          ></ProDescriptions>
        ),
        cancelText: "关闭",
        okText: "使用解析结果",
        onOk: () => {
          ref.current?.setFieldsValue({
            ...res,
            name: res.title,
            icon: {
              name: res.icon?.split("/").pop(),
              url: iconUrl,
            },
          });
        },
      });
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
        trigger={<Button type="primary">新增网站</Button>}
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
      {contextHolder}
    </>
  );
};

export default WebsiteHandle;
