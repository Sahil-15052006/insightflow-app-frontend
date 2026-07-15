import { TouchableOpacity, Text, View } from "react-native";

type Props ={
    title:string,
    onPress:()=>void
}

export default function UploadButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity className="rounded-xl border-2 border-[#2196F3] bg-[#2196F3]/10 p-4" onPress={onPress}>
      <View className="flex-row items-center justify-center gap-2.5">
        <Text className="text-[15px] font-semibold text-[#2196F3]">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
