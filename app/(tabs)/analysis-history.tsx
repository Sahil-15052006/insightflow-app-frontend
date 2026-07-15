import { View, Text, ScrollView, TextInput } from "react-native";

export default function AnalysisHistory() {
  return (
    <ScrollView className="flex-1 bg-[#050E1F] p-5">

      {/* Header */}
      <Text className="my-[25px] text-[22px] font-semibold text-[#E5E7EB]">Analysis History</Text>

      {/* Search */}
      <TextInput
        placeholder="Search datasets..."
        placeholderTextColor="#6B7280"
        className="mb-5 rounded-xl border border-[#1F2A44] bg-[#0F1A33] p-3 text-[#E5E7EB]"
      />

      {/* Card 1 */}
      <View className="mb-[14px] rounded-[14px] bg-[#0F1A33] p-4"><Text className="text-base font-semibold text-[#E5E7EB]">Q4 Sales Analysis</Text><Text className="mt-1 text-[#9CA3AF]">5 charts • 8 insights</Text>

        <View className="mt-2.5 flex-row"><Text className="mr-1.5 rounded-md bg-[#7C5CFF] px-2 py-[3px] text-[10px] text-white">Sales</Text><Text className="mr-1.5 rounded-md bg-[#7C5CFF] px-2 py-[3px] text-[10px] text-white">Revenue</Text>
        </View>

        <Text className="mt-2.5 text-xs text-[#6B7280]">2h ago</Text>
      </View>

      {/* Card 2 */}
      <View className="mb-[14px] rounded-[14px] bg-[#0F1A33] p-4"><Text className="text-base font-semibold text-[#E5E7EB]">Customer Segmentation</Text><Text className="mt-1 text-[#9CA3AF]">3 charts • 5 insights</Text>

        <View className="mt-2.5 flex-row"><Text className="mr-1.5 rounded-md bg-[#3B82F6] px-2 py-[3px] text-[10px] text-white">Customers</Text><Text className="mr-1.5 rounded-md bg-[#3B82F6] px-2 py-[3px] text-[10px] text-white">Demographics</Text>
        </View>

        <Text className="mt-2.5 text-xs text-[#6B7280]">1d ago</Text>
      </View>

      {/* Card 3 */}
      <View className="mb-[14px] rounded-[14px] bg-[#0F1A33] p-4"><Text className="text-base font-semibold text-[#E5E7EB]">Marketing ROI</Text><Text className="mt-1 text-[#9CA3AF]">4 charts • 6 insights</Text>

        <View className="mt-2.5 flex-row"><Text className="mr-1.5 rounded-md bg-[#22C55E] px-2 py-[3px] text-[10px] text-white">Marketing</Text><Text className="mr-1.5 rounded-md bg-[#22C55E] px-2 py-[3px] text-[10px] text-white">ROI</Text>
        </View>

        <Text className="mt-2.5 text-xs text-[#6B7280]">3d ago</Text>
      </View>

    </ScrollView>
  );
}
