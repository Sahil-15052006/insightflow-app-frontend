import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


export default function BackButton(){

    const router=useRouter()
    
    return(
        <View>
            <TouchableOpacity onPress={() => router.back()}>
                      <Text className="mb-5 self-start rounded-md border border-[#7C5CFF] bg-[#7C5CFF] px-3 py-1.5 text-xs text-white"> Back </Text>
            </TouchableOpacity>
        </View>
    )
}
