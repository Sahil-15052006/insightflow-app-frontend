import { ScrollView, Text, View, Dimensions } from "react-native";
import { useDataset } from "@/context/DatasetContext";

import PieChartComponent from "@/components/charts/PieChartComponent";
import BarChartComponent from "@/components/charts/BarChartComponent";
import LineChartComponent from "@/components/charts/LineChartComponent";

const screenWidth = Dimensions.get("window").width;

export default function Visualization() {
  const { uploadResponse } = useDataset();

  const rows = uploadResponse?.data || [];

  if (rows.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#050E1F]">
        <Text className="text-gray-400">
          No data available
        </Text>
      </View>
    );
  }

  const columns = Object.keys(rows[0]);

  const numericColumns: string[] = [];
  const categoryColumns: string[] = [];
  const booleanColumns: string[] = [];
  const dateColumns: string[] = [];

  columns.forEach((column) => {
    const value = rows[0][column];

    if (typeof value === "number") {
      numericColumns.push(column);
    } else if (typeof value === "boolean") {
      booleanColumns.push(column);
    } else if (
      typeof value === "string" &&
      !isNaN(Date.parse(value))
    ) {
      dateColumns.push(column);
    } else {
      const uniqueValues = [
        ...new Set(rows.map((row:any) => row[column])),
      ];

      if (uniqueValues.length <= 15) {
        categoryColumns.push(column);
      }
    }
  });

  const pieColumn =
    booleanColumns[0] || categoryColumns[0];

  const barCategory = categoryColumns[0];
  const barNumeric = numericColumns[0];

  const lineDate = dateColumns[0];
  const lineNumeric = numericColumns[0];

  const chartConfig = {
    backgroundGradientFrom: "#0F1A33",
    backgroundGradientTo: "#0F1A33",
    decimalPlaces: 0,
    color: (opacity = 1) =>
      `rgba(34, 197, 94, ${opacity})`,
    labelColor: (opacity = 1) =>
      `rgba(229, 231, 235, ${opacity})`,
    propsForBackgroundLines: {
      stroke: "#1E293B",
    },
  };

  // PIE DATA
  const pieData = pieColumn
    ? Object.entries(
        rows.reduce((acc: any, row: any) => {
          const key = String(row[pieColumn]);

          acc[key] = (acc[key] || 0) + 1;

          return acc;
        }, {})
      ).map(([name, count], index) => ({
        name,
        population: count,
        color: [
          "#22C55E",
          "#3B82F6",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ][index % 6],
        legendFontColor: "#E5E7EB",
        legendFontSize: 12,
      }))
    : [];

  // BAR DATA
  const barData =
    barCategory && barNumeric
      ? {
          labels: rows
            .slice(0, 8)
            .map((row:any) =>
              String(row[barCategory]).slice(0, 8)
            ),

          datasets: [
            {
              data: rows
                .slice(0, 8)
                .map((row:any) =>
                  Number(row[barNumeric]) || 0
                ),
            },
          ],
        }
      : null;

  // LINE DATA
  const lineData =
    lineDate && lineNumeric
      ? {
          labels: rows
            .slice(0, 8)
            .map((row:any) =>
              String(row[lineDate]).slice(5, 10)
            ),

          datasets: [
            {
              data: rows
                .slice(0, 8)
                .map((row:any) =>
                  Number(row[lineNumeric]) || 0
                ),
            },
          ],
        }
      : null;

  return (
    <ScrollView
      className="flex-1 bg-[#050E1F] p-5"
      showsVerticalScrollIndicator={false}
    >
      <Text className="mb-6 text-2xl font-semibold text-[#E5E7EB]">
        Visualizations
      </Text>

      {pieData.length > 0 && (
        <View className="mb-6 rounded-2xl bg-[#0F1A33] p-4">
          <Text className="mb-4 text-lg font-semibold text-white">
            {pieColumn} Distribution
          </Text>

          <PieChartComponent
            data={pieData}
            chartConfig={chartConfig}
          />
        </View>
      )}

      {barData && (
        <View className="mb-6 rounded-2xl bg-[#0F1A33] p-4">
          <Text className="mb-4 text-lg font-semibold text-white">
            {barCategory} vs {barNumeric}
          </Text>

          <BarChartComponent
            data={barData}
            width={screenWidth}
            chartConfig={chartConfig}
          />
        </View>
      )}

      {lineData && (
        <View className="mb-6 rounded-2xl bg-[#0F1A33] p-4 mb-24">
          <Text className="mb-4 text-lg font-semibold text-white">
            {lineNumeric} Trend
          </Text>

          <LineChartComponent
            data={lineData}
            width={screenWidth}
            chartConfig={chartConfig}
          />
        </View>
      )}
    </ScrollView>
  );
}