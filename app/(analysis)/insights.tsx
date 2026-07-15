import { View, Text, ScrollView } from "react-native";

export default function Insights() {
  return (
    <ScrollView className="flex-1 bg-[#050E1F] p-5">

      {/* Header */}
      <View className="my-[25px] flex-row items-center"><View className="mr-2.5 h-10 w-10 items-center justify-center rounded-[10px] bg-[#7C5CFF]"><Text className="text-lg">💡</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-[#E5E7EB]">AI Generated Insights</Text>
          <Text className="text-xs text-[#9CA3AF]">
            Powered by Machine Learning
          </Text>
        </View>
      </View>

      {/* Main Insight Card */}
      <View className="mb-5 rounded-[14px] border border-[#7C5CFF] bg-[#0F1A33] p-[18px]">

        <View className="mb-2.5 flex-row"><Text className="mr-1.5 rounded-md bg-[#22C55E] px-2 py-[3px] text-[10px] text-white">Growth</Text><Text className="rounded-md bg-[#7C5CFF] px-2 py-[3px] text-[10px] text-white">High Impact</Text>
        </View>

        <Text className="mb-3 leading-5 text-[#E5E7EB]">
          Revenue increased by 23.5% compared to the previous quarter.
          The growth is primarily driven by the Western region,
          which accounts for 42% of total sales.
        </Text>

        <View className="flex-row justify-between"><Text className="text-xs text-[#9CA3AF]">Confidence: 94%</Text><Text className="text-xs text-[#7C5CFF]">View Details →</Text>
        </View>

      </View>

      {/* Top Category */}
      <View className="mb-[14px] rounded-[14px] bg-[#0F1A33] p-4"><Text className="font-semibold text-[#E5E7EB]">Top Category</Text><Text className="mb-1.5 text-xs text-[#3B82F6]">Trending</Text>

        <Text className="text-[#9CA3AF]">
          Electronics leads with 38% market share
        </Text>
      </View>

      {/* Alert */}
      <View className="mb-[14px] rounded-[14px] border border-[#F59E0B] bg-[#0F1A33] p-4"><Text className="font-semibold text-[#E5E7EB]">Attention Needed</Text><Text className="mb-1.5 text-xs text-[#F59E0B]">Alert</Text>

        <Text className="text-[#9CA3AF]">
          Q4 inventory levels below threshold
        </Text>
      </View>

    </ScrollView>
  );
}
