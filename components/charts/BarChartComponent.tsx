import { ScrollView, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface Props {
  data: any;
  width: number;
  chartConfig: any;
}

export default function BarChartComponent({
  data,
  width,
  chartConfig,
}: Props) {
  return (
    <ScrollView horizontal>
      <BarChart
        data={data}
        width={width}
        height={280}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
      />
    </ScrollView>
  );
}