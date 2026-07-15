import { View, Text } from "react-native";
import api from "../api";
import * as DocumentPicker from "expo-document-picker"
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import ButtonComponent from "@/components/Button";
import DatasetPreview from "@/components/dataset-preview";
import UploadButton from "@/components/UploadButton";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {

  const [userName,setUserName]=useState("")
  const [file,setFile]=useState<any>(null)
  const [btnTitle,setBtnTitle]=useState("Select Dataset File")
  const [data,setData] = useState<any>(null)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    getUserData()
  },[])

  const getUserData = async()=>{
    const res= await api.get('/userInfo')
    setUserName(res.user.name)
  }

  const selectFile=async()=>{
    try{
      const result = await DocumentPicker.getDocumentAsync({
        type:"*/*",
      })
      if (!result.canceled){
        const selectedFile = result.assets[0]
        setFile(selectedFile)
        setBtnTitle(selectedFile.name)
      }     
    }catch(err:any){
      console.log(`Error Picking File : ${err.message}`);
      console.log(file.uri);
    }
  }

const uploadFile = async () => {
  if (!file) {
    return Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Select a file first'
    });
  }

  const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    } as any);

    try {
      setLoading(true);

      const jsonData = await api.upload('/uploadFile/upload', formData);
      setData(jsonData.cleanedData);
      console.log(jsonData.cleanedData);

    } catch (err: any) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
};
  
  return (
    <View className="flex-1 bg-[#050E1F] p-5">

      {loading && <LoadingOverlay/>}

      <View className="relative mb-[30px] mt-10">
        <Text className="text-sm text-[#9CA3AF]">Welcome</Text>
        <Text className="text-[22px] font-semibold text-[#E5E7EB]">{userName} 👋</Text>

        <View className="absolute right-0 top-0 h-9 w-9 items-center justify-center rounded-full bg-[#7C5CFF]">
          <Text className="font-semibold text-white">{userName[0]}</Text>
        </View>
      </View>

      <UploadButton title={btnTitle} onPress={selectFile}/>
      
      <ButtonComponent title="Upload DataSet" method={uploadFile}/>

      <DatasetPreview data2={data}/>

      <Toast/>

      

    </View>
  );
}
