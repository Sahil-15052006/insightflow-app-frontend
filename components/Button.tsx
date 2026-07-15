import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
    title:string;
    method:()=>void;
}

export default function Button({title,method}:Props) {

  return (
    <View>
        <TouchableOpacity onPress={method}>
            <LinearGradient
                colors={["#7C5CFF", "#9B8AFB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ marginTop: 20, padding: 16, borderRadius: 14, alignItems: "center" }}
            >
                <Text className="text-base font-semibold text-white">{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
  )
}
