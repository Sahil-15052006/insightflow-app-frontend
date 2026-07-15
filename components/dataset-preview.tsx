import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

export default function DatasetPreview(data2:any) {
  const router = useRouter();

  const data = [
    { id: "001", name: "Alpha", sales: "$2,450", date: "12/01" },
    { id: "002", name: "Beta", sales: "$3,120", date: "12/02" },
    { id: "003", name: "Gamma", sales: "$1,890", date: "12/03" },
    { id: "004", name: "Delta", sales: "$4,210", date: "12/04" },
    { id: "005", name: "Epsilon", sales: "$2,780", date: "12/05" },
  ];

  return (
    <View className="flex-1 bg-[#050E1F]">
      
      {/* Header */}
      <View className="mb-5 mt-10 flex-row items-center">
        <Text className="text-lg font-semibold text-[#E5E7EB]">Dataset Preview</Text>
      </View>

      {/* Table */}
      <View className="overflow-hidden rounded-xl bg-[#111B35]">

        {/* Table Header */}
        <View className="flex-row bg-[#1E2A4A] p-3">
          <Text className="flex-1 text-xs text-[#9CA3AF]">ID</Text>
          <Text className="flex-1 text-xs text-[#9CA3AF]">Name</Text>
          <Text className="flex-1 text-xs text-[#9CA3AF]">Sales</Text>
          <Text className="flex-1 text-xs text-[#9CA3AF]">Date</Text>
        </View>

        {data.map((item, index) => (
          <View key={index} className="flex-row border-t border-[#1F2A44] p-3">
            <Text className="flex-1 text-[13px] text-[#E5E7EB]">{item.id}</Text>
            <Text className="flex-1 text-[13px] text-[#E5E7EB]">{item.name}</Text>
            <Text className="flex-1 text-[13px] text-[#E5E7EB]">{item.sales}</Text>
            <Text className="flex-1 text-[13px] text-[#E5E7EB]">{item.date}</Text>
          </View>
        ))}

      </View>
      <Button title="Analyze Data" method={()=>router.push('/(analysis)/dashboard')}/>
    </View>
  );
}
