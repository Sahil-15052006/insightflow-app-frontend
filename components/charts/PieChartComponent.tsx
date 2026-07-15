import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface Props {
  data: any;
  chartConfig: any;
}

export default function PieChartComponent({
  data,
  chartConfig,
}: Props) {
  return (
    <PieChart
      data={data}
      width={screenWidth - 40}
      height={280}
      accessor="population"
      backgroundColor="transparent"
      chartConfig={chartConfig}
      paddingLeft="15"
      absolute
    />
  );
}