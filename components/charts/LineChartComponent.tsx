import { ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface Props {
  data: any;
  width: number;
  chartConfig: any;
}

export default function LineChartComponent({
  data,
  width,
  chartConfig,
}: Props) {
  return (
    <ScrollView horizontal>
      <LineChart
        data={data}
        width={width}
        height={280}
        chartConfig={chartConfig}
        bezier
      />
    </ScrollView>
  );
}