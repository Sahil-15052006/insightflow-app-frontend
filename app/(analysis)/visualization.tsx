import { View, Text, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Visualization() {
  
  const barData = {
    labels: ["North", "South", "East", "West", "Central"],
    datasets: [{ data: [2400, 3200, 1800, 4200, 2700] }],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: [100, 200, 300, 380, 450, 520, 600] }],
  };

  const pieData = [
    {
      name: "Product A",
      population: 40,
      color: "#7C5CFF",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
    {
      name: "Product B",
      population: 33,
      color: "#3B82F6",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
    {
      name: "Product C",
      population: 27,
      color: "#EC4899",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
  ];

  return (
    <View className="flex-1 bg-[#050E1F] p-2.5">

        <Text className="my-[25px] px-2.5 text-2xl font-semibold text-[#E5E7EB]">Visualizations</Text>

        <ScrollView className="flex-1 bg-[#050E1F] px-[5px] pb-[100px]" >

            {/* Bar Chart */}
            <View className="mb-2.5 items-stretch justify-center rounded-[14px] bg-[#0F1A33] p-2.5">
                <View className="mb-2.5 flex-row justify-between"><Text className="font-semibold text-[#E5E7EB]">Sales by Region</Text><Text className="text-xs text-[#9CA3AF]">Bar Chart</Text>
                </View>

                <BarChart
                data={barData}
                width={screenWidth - 60}
                height={180}
                yAxisLabel="$"
                yAxisSuffix=""
                chartConfig={chartConfig}
                style={{ borderRadius: 12, padding: 2 }}
                />
            </View>

            {/* Line Chart */}
            <View className="mb-2.5 items-stretch justify-center rounded-[14px] bg-[#0F1A33] p-2.5">
                <View className="mb-2.5 flex-row justify-between"><Text className="font-semibold text-[#E5E7EB]">Trend Analysis</Text><Text className="text-xs text-[#9CA3AF]">Line Chart</Text>
                </View>

                <LineChart
                data={lineData}
                width={screenWidth - 60}
                height={180}
                chartConfig={chartConfig}
                style={{ borderRadius: 12, padding: 2 }}
                />
            </View>

            {/* Pie Chart */}
            <View className="mb-2.5 items-stretch justify-center rounded-[14px] bg-[#0F1A33] p-2.5">
                <View className="mb-2.5 flex-row justify-between"><Text className="font-semibold text-[#E5E7EB]">Category Distribution</Text><Text className="text-xs text-[#9CA3AF]">Pie Chart</Text>
                </View>

                <PieChart
                data={pieData}
                width={screenWidth - 60}
                height={180}
                accessor="population"
                backgroundColor="transparent"
                chartConfig={chartConfig}
                paddingLeft="10"
                />
            </View>

            </ScrollView>
    </View>
     
  );
}

const chartConfig = {
  backgroundGradientFrom: "#050E1F",
  backgroundGradientTo: "#050E1F",

  decimalPlaces: 0,

  color: (opacity = 1) => `rgba(124,92,255, ${opacity})`,

  labelColor: () => "#9CA3AF",

  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#7C5CFF",
  },
};
