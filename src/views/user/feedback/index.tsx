import FullPageContainer from "@/components/containter/full";
import { getFaqListAll } from "@/services/feedback/faq";
import { useRequest } from "ahooks";

const Feedback = () => {
  const { data, loading } = useRequest(getFaqListAll);
  console.log("🚀 ~ Feedback ~ data:", data);

  return <FullPageContainer></FullPageContainer>;
};

export default Feedback;
