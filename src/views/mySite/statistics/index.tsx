import BasePageContainer from "@/components/containter/base";
import { getBlogStatistics } from "@/services/mySite/blog";
import { Line } from "@ant-design/charts";
import { StatisticCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Space } from "antd";
import { format } from "date-fns";

const { Statistic } = StatisticCard;

const StatisticsPage = () => {
  const { data: blogData, loading: blogLoading } =
    useRequest(getBlogStatistics);

  const { last30Days = [] } = blogData ?? {};

  console.log(blogData, blogLoading);

  return (
    <BasePageContainer>
      <Space className="w-full" direction="vertical">
        <StatisticCard.Group direction="row" loading={blogLoading}>
          <StatisticCard
            statistic={{
              title: "今日新增文章",
              value: blogData?.todayNewCount ?? 0,
              description: (
                <Statistic
                  title="较昨日新增"
                  value={
                    blogData?.yesterdayNewCount
                      ? (
                          (((blogData?.todayNewCount ?? 0) -
                            (blogData?.yesterdayNewCount ?? 0)) /
                            (blogData?.yesterdayNewCount ?? 1)) *
                          100
                        ).toFixed(2) + "%"
                      : "N/A"
                  }
                  trend={
                    (blogData?.todayNewCount ?? 0) -
                      (blogData?.yesterdayNewCount ?? 0) >
                    0
                      ? "up"
                      : "down"
                  }
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "本周新增文章",
              value: blogData?.nowWeekCount ?? 0,
              description: (
                <Statistic
                  title="较上周新增"
                  value={
                    blogData?.lastWeekCount
                      ? (
                          (((blogData?.nowWeekCount ?? 0) -
                            (blogData?.lastWeekCount ?? 0)) /
                            (blogData?.lastWeekCount ?? 1)) *
                          100
                        ).toFixed(2) + "%"
                      : "N/A"
                  }
                  trend={
                    (blogData?.nowWeekCount ?? 0) -
                      (blogData?.lastWeekCount ?? 0) >
                    0
                      ? "up"
                      : "down"
                  }
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "本月新增文章",
              value: blogData?.nowMonthCount ?? 0,
              description: (
                <Statistic
                  title="较上月新增"
                  value={
                    blogData?.lastMonthCount
                      ? (
                          (((blogData?.nowMonthCount ?? 0) -
                            (blogData?.lastMonthCount ?? 0)) /
                            (blogData?.lastMonthCount ?? 1)) *
                          100
                        ).toFixed(2) + "%"
                      : "N/A"
                  }
                  trend={
                    (blogData?.nowMonthCount ?? 0) -
                      (blogData?.lastMonthCount ?? 0) >
                    0
                      ? "up"
                      : "down"
                  }
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "文章总数",
              value: blogData?.totalCount ?? 0,
            }}
          />
        </StatisticCard.Group>
        <StatisticCard
          title="最近30天新增文章趋势"
          chart={
            <Line
              {...{
                data: last30Days,
                xField: (d: any) => format(new Date(d.date), "MM-dd"),
                yField: "count",
                point: {
                  shapeField: "square",
                  sizeField: 2,
                },
                interaction: {
                  tooltip: {
                    marker: false,
                  },
                },
                style: {
                  lineWidth: 1,
                },
                axis: {
                  y: {
                    // 保留整数值
                    labelFilter: (v: number) => {
                      return v % 1 === 0;
                    },
                  },
                },
              }}
            />
          }
        />
      </Space>
    </BasePageContainer>
  );
};

export default StatisticsPage;
