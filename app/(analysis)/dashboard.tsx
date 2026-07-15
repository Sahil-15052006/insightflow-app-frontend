import { View, Text, ScrollView } from "react-native";
import { useDataset } from "@/context/DatasetContext";

export default function Dashboard() {
  const { uploadResponse } = useDataset();

  const data = uploadResponse?.data || [];

  const totalRows = data.length;

  const totalColumns =
    totalRows > 0 ? Object.keys(data[0]).length : 0;

  let numericColumns = 0;
  let missingValues = 0;

  if (totalRows > 0) {
    Object.keys(data[0]).forEach((key) => {
      const value = data[0][key];

      if (typeof value === "number") {
        numericColumns++;
      }
    });

    data.forEach((row:any) => {
      Object.values(row).forEach((value) => {
        if (
          value === null ||
          value === undefined ||
          value === ""
        ) {
          missingValues++;
        }
      });
    });
  }

  return (
    <ScrollView className="flex-1 bg-[#050E1F] p-5">
      <Text className="my-[25px] text-2xl font-semibold text-[#E5E7EB]">
        Dashboard
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {/* Total Rows */}
        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4">
          <Text className="text-xs text-[#9CA3AF]">
            Total Rows
          </Text>

          <Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">
            {totalRows}
          </Text>

          <Text className="mt-1 text-[#9CA3AF]">
            Records analyzed
          </Text>
        </View>

        {/* Total Columns */}
        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4">
          <Text className="text-xs text-[#9CA3AF]">
            Total Columns
          </Text>

          <Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">
            {totalColumns}
          </Text>

          <Text className="mt-1 text-[#9CA3AF]">
            Fields detected
          </Text>
        </View>

        {/* Numeric Columns */}
        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4">
          <Text className="text-xs text-[#9CA3AF]">
            Numeric Columns
          </Text>

          <Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">
            {numericColumns}
          </Text>

          <Text className="mt-1 text-[#9CA3AF]">
            Ready for charts
          </Text>
        </View>

        {/* Missing Values */}
        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4">
          <Text className="text-xs text-[#9CA3AF]">
            Missing Values
          </Text>

          <Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">
            {missingValues}
          </Text>

          <Text className="mt-1 text-[#9CA3AF]">
            Empty cells found
          </Text>
        </View>
      </View>

      {/* Dataset Status */}
      <View className="mt-5 rounded-[14px] bg-[#0F1A33] p-4">
        <Text className="mb-4 text-lg font-semibold text-[#E5E7EB]">
          Dataset Status
        </Text>

        <View className="mb-3 flex-row justify-between">
          <Text className="text-[#9CA3AF]">
            Upload
          </Text>

          <Text className="text-[#22C55E]">
            ✓ Completed
          </Text>
        </View>

        <View className="mb-3 flex-row justify-between">
          <Text className="text-[#9CA3AF]">
            Cleaning
          </Text>

          <Text className="text-[#22C55E]">
            ✓ Completed
          </Text>
        </View>

        <View className="mb-3 flex-row justify-between">
          <Text className="text-[#9CA3AF]">
            Analysis
          </Text>

          <Text className="text-[#22C55E]">
            ✓ Ready
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-[#9CA3AF]">
            Dataset Size
          </Text>

          <Text className="text-[#E5E7EB]">
            {totalRows} × {totalColumns}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}