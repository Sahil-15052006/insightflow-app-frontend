import { View, Text, ScrollView } from "react-native";
import { useDataset } from "@/context/DatasetContext";

export default function Insights() {
  const { uploadResponse } = useDataset();

  const insights =
    uploadResponse?.insights || [];

  const totalRows =
    uploadResponse?.data?.length || 0;

  const totalColumns =
    Object.keys(
      uploadResponse?.schema || {}
    ).length;

  const groupedSchema =
    uploadResponse?.groupedSchema || {};

  const numericCount =
    groupedSchema.numeric?.length || 0;

  const categoricalCount =
    (groupedSchema.categorical?.length || 0) +
    (groupedSchema.boolean?.length || 0);

  return (
    <ScrollView
      className="flex-1 bg-[#050E1F] p-5"
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      {/* Header */}
      <View className="my-6 flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFF]">
          <Text className="text-lg">
            💡
          </Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-white">
            Dataset Insights
          </Text>

          <Text className="text-xs text-[#9CA3AF]">
            Generated automatically
          </Text>
        </View>
      </View>

      {/* Dataset Overview */}
      <View className="mb-5 rounded-2xl border border-[#7C5CFF] bg-[#0F1A33] p-5">
        <Text className="mb-3 text-lg font-semibold text-white">
          Dataset Overview
        </Text>

        <Text className="leading-6 text-[#E5E7EB]">
          {totalRows} rows •{" "}
          {totalColumns} columns
        </Text>

        <Text className="mt-2 text-[#9CA3AF]">
          {numericCount} numeric
          columns •{" "}
          {categoricalCount} categorical
          columns
        </Text>
      </View>

      {/* Insights */}
      {insights.length > 0 ? (
        insights.map(
          (
            insight: string,
            index: number
          ) => (
            <View
              key={index}
              className="mb-4 rounded-2xl bg-[#0F1A33] p-5"
            >
              <Text className="text-base leading-7 text-[#E5E7EB]">
                {insight}
              </Text>
            </View>
          )
        )
      ) : (
        <View className="rounded-2xl bg-[#0F1A33] p-5">
          <Text className="text-center text-[#9CA3AF]">
            No insights available for
            this dataset.
          </Text>
        </View>
      )}

      {/* Status */}
      <View className="mt-2 rounded-2xl border border-[#22C55E] bg-[#0F1A33] p-5">
        <Text className="font-semibold text-white">
          Analysis Complete
        </Text>

        <Text className="mt-2 text-[#9CA3AF]">
          Dataset processed
          successfully and is ready
          for exploration and
          visualization.
        </Text>
      </View>
    </ScrollView>
  );
}