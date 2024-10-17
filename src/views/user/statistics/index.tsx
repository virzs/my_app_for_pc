import LineChart from "@/components/Chart/Line";
import BasePageContainer from "@/components/containter/base";
import { getUsersStatistics } from "@/services/user";
import { StatisticCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Space } from "antd";
import { format } from "date-fns";

const { Statistic } = StatisticCard;

const StatisticsPage = () => {
  const { data, loading } = useRequest(getUsersStatistics);

  const { last7Days = [] } = data ?? {};

  console.log(data, loading);

  return (
    <BasePageContainer>
      <Space className="w-full" direction="vertical">
        <StatisticCard.Group direction="row" loading={loading}>
          <StatisticCard
            statistic={{
              title: "今日新增用户",
              value: data?.today ?? 0,
              description: (
                <Statistic
                  title="较昨日新增"
                  value={
                    data?.yesterday
                      ? (
                          (((data?.today ?? 0) - (data?.yesterday ?? 0)) /
                            (data?.yesterday ?? 1)) *
                          100
                        ).toFixed(2) + "%"
                      : "N/A"
                  }
                  trend={
                    (data?.today ?? 0) - (data?.yesterday ?? 0) > 0
                      ? "up"
                      : "down"
                  }
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: "未验证邮箱用户",
              value: data?.unverified ?? 0,
            }}
          />
          <StatisticCard
            statistic={{
              title: "已禁用用户",
              value: data?.disabled ?? 0,
            }}
          />
          <StatisticCard
            statistic={{
              title: "用户总数",
              value: data?.total ?? 0,
            }}
          />
        </StatisticCard.Group>
        <StatisticCard
          title="最近7天新增用户趋势"
          chart={
            <>
              <LineChart
                data={last7Days}
                xField="date"
                yField="count"
                xAxisLabelFormatter={(v) => format(new Date(v), "MM-dd")}
                options={{
                  yAxis: {
                    minInterval: 1,
                  },
                }}
              />
            </>
          }
        />
      </Space>
    </BasePageContainer>
  );
};

export default StatisticsPage;
