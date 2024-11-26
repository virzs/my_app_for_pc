import { getBlogDetail, publishBlog } from "@/services/mySite/blog";
import { ProCard, ProList } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdEditor } from "zs_library";
import { Button, message, Modal, Tag } from "antd";
import { css, cx } from "@emotion/css";
import { format } from "date-fns";
import FullPageContainer from "@/components/containter/full";
import { RiCloseLine, RiEditLine, RiShareLine } from "@remixicon/react";
import { MySitePaths } from "../router";
import PrivateImage from "@/components/Image/PrivateImage";

const { useModal } = Modal;

const BlogDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [modal, contextHolder] = useModal();

  const { data, loading, run, refresh } = useRequest(getBlogDetail, {
    manual: true,
  });

  const { run: publishRun } = useRequest(publishBlog, {
    manual: true,
    onSuccess: () => {
      refresh();
      message.success("操作成功");
    },
  });

  useEffect(() => {
    if (params.id) {
      run(params.id);
    }
  }, []);

  return (
    <FullPageContainer
      loading={loading}
      cardProps={{
        extra: (
          <>
            <Button
              icon={
                !data?.isPublish ? (
                  <RiShareLine size={16} />
                ) : (
                  <RiCloseLine size={16} />
                )
              }
              disabled={!data}
              onClick={() => {
                modal.confirm({
                  title: !data?.isPublish ? "发布" : "取消发布",
                  content: !data?.isPublish
                    ? "确认发布吗？"
                    : "确认取消发布吗？",
                  onOk: () => {
                    publishRun(data?._id);
                  },
                });
              }}
            >
              {!data?.isPublish ? "发布" : "取消发布"}
            </Button>
            <Button
              icon={<RiEditLine size={16} />}
              onClick={() => {
                navigate(MySitePaths.blogHandle + "/" + params.id);
              }}
            >
              编辑
            </Button>
          </>
        ),
        split: "vertical",
      }}
    >
      <ProCard
        colSpan="70%"
        className={cx(
          "max-w-3xl mx-auto",
          css`
            .ant-pro-card-title {
              width: 100%;
            }
          `
        )}
        title={
          <div className="relative min-h-24 w-full">
            {data?.cover && (
              <PrivateImage
                preview={false}
                loading="lazy"
                resource={data?.cover}
                alt={data?.title}
              />
            )}
            <h1 className="absolute left-0 bottom-0 px-6 bg-gray-100 dark:bg-black">
              {data?.title}
            </h1>
          </div>
        }
      >
        <MdEditor.Preview>{data?.content}</MdEditor.Preview>
      </ProCard>
      <ProCard title="操作记录">
        <ProList
          dataSource={data?.operationRecord}
          metas={{
            title: {
              dataIndex: "createdAt",
              render: (t) => format(t as string, "yyyy-MM-dd HH:mm:ss"),
            },
            subTitle: {
              dataIndex: "type",
              render: (t) => {
                const l: { [x: string]: { title: string; color: string } } = {
                  publish: { title: "发布", color: "green" },
                  unpublish: { title: "取消发布", color: "red" },
                  update: { title: "更新", color: "blue" },
                };

                const n = l[t as string];

                return <Tag color={n.color}>{n.title}</Tag>;
              },
            },
            description: {
              dataIndex: ["operator", "username"],
            },
          }}
        ></ProList>
      </ProCard>
      {contextHolder}
    </FullPageContainer>
  );
};

export default BlogDetail;
