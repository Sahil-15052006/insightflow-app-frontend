import { View, Text, ScrollView } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView className="flex-1 bg-[#050E1F] p-5">

      <Text className="my-[25px] text-2xl font-semibold text-[#E5E7EB]">Dashboard</Text>

      {/* KPI Cards */}
      <View className="flex-row flex-wrap justify-between">

        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4"><Text className="text-xs text-[#9CA3AF]">Total</Text><Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">14,450</Text><Text className="mt-1 text-[#22C55E]">↑ 12.5%</Text>
        </View>

        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4"><Text className="text-xs text-[#9CA3AF]">Average</Text><Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">2,890</Text><Text className="mt-1 text-[#22C55E]">↑ 8.3%</Text>
        </View>

        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4"><Text className="text-xs text-[#9CA3AF]">Maximum</Text><Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">4,210</Text><Text className="mt-1 text-[#9CA3AF]">Peak value</Text>
        </View>

        <View className="mb-[14px] w-[48%] rounded-[14px] bg-[#0F1A33] p-4"><Text className="text-xs text-[#9CA3AF]">Minimum</Text><Text className="mt-1.5 text-[22px] font-semibold text-[#E5E7EB]">1,890</Text><Text className="mt-1 text-[#9CA3AF]">Lowest value</Text>
        </View>

      </View>

      {/* Performance Section */}
      <View className="mt-5 rounded-[14px] bg-[#0F1A33] p-4">

        <View className="mb-[14px] flex-row justify-between"><Text className="font-semibold text-[#E5E7EB]">
            Performance Overview
          </Text>

          <Text className="text-[#7C5CFF]">View All</Text>
        </View>

        <View className="mt-2.5 flex-row justify-between"><Text className="text-[#9CA3AF]">Completion Rate</Text><Text className="text-[#E5E7EB]">75%</Text>
        </View>

        <View className="mt-1.5 h-1.5 rounded-full bg-[#1F2A44]"><View className="h-1.5 w-3/4 rounded-full bg-[#7C5CFF]" />
        </View>

        <View className="mt-2.5 flex-row justify-between"><Text className="text-[#9CA3AF]">Data Quality</Text><Text className="text-[#E5E7EB]">92%</Text>
        </View>

        <View className="mt-1.5 h-1.5 rounded-full bg-[#1F2A44]"><View className="h-1.5 w-[92%] rounded-full bg-[#22C55E]" />
        </View>

      </View>

    </ScrollView>
  );
}
