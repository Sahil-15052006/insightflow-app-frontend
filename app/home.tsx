import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import api from "./api";

import ButtonComponent from "@/components/Button";
import UploadButton from "@/components/UploadButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useDataset } from "@/context/DatasetContext";

export default function UploadScreen() {
  const [userName, setUserName] = useState("User");
  const [file, setFile] = useState<any>(null);
  const [btnTitle, setBtnTitle] = useState("Select Dataset File");
  const [loading, setLoading] = useState(false);

  const { setUploadResponse } = useDataset();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await api.get("/userInfo");
      setUserName(res.user?.name || "User");
    } catch (err) {
      console.log("User Info Error:", err);
    }
  };

  const selectFile = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        });

      if (!result.canceled) {
        const selectedFile = result.assets[0];

        setFile(selectedFile);
        setBtnTitle(selectedFile.name);
      }
    } catch (err: any) {
      console.log("File Picker Error:", err.message);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to select file",
      });
    }
  };

  const uploadFile = async () => {
    if (!file) {
      return Toast.show({
        type: "error",
        text1: "No file selected",
        text2: "Please select a dataset first",
      });
    }

    const formData = new FormData();

    const extension = file.name.split(".").pop()?.toLowerCase();

    let mimeType = file.mimeType;

    if (!mimeType) {
    if (extension === "csv") {
        mimeType = "text/csv";
    } else if (extension === "xlsx") {
        mimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    } else if (extension === "xls") {
        mimeType = "application/vnd.ms-excel";
    } else {
        mimeType = "application/octet-stream";
    }
    }

    formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: mimeType,
    } as any);

    // console.log(file);  
    // console.log(formData);

    try {
      setLoading(true);

      const response = await api.upload(
        "/uploadFile/upload",
        formData
      );

    //   console.log(response)

      // Save upload response globally
      setUploadResponse(response);

      Toast.show({
        type: "success",
        text1: "Upload Successful",
        text2: "Generating insights...",
      });

      // Navigate to analysis
      router.push("/(analysis)/dashboard");

    } catch (err: any) {
      console.log(
        err.response?.data || err.message
      );

      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2:
          err.response?.data?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#050E1F] px-5 pt-12">

      {loading && <LoadingOverlay />}

      {/* Header */}
      <View className="mb-12 flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-[#9CA3AF]">
            Welcome back
          </Text>

          <Text className="text-2xl font-bold text-white">
            {userName} 👋
          </Text>
        </View>

        <View className="h-12 w-12 items-center justify-center rounded-full bg-[#7C5CFF]">
          <Text className="text-lg font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Hero Section */}
      <View className="mb-10 rounded-3xl border border-[#1F2937] bg-[#0B1528] p-6">
        <Text className="mb-2 text-2xl font-bold text-white">
          Upload Dataset
        </Text>

        <Text className="text-[#9CA3AF]">
          Upload CSV or Excel files to generate
          dashboards, insights and visualizations
          instantly.
        </Text>
      </View>

      {/* Select File */}
      <UploadButton
        title={btnTitle}
        onPress={selectFile}
      />

      {/* Upload */}
      <View className="mt-5">
        <ButtonComponent
          title="Analyze Dataset"
          method={uploadFile}
        />
      </View>

      {/* Supported Formats */}
      <View className="mt-10 rounded-2xl bg-[#0B1528] p-5">
        <Text className="mb-3 text-lg font-semibold text-white">
          Supported Formats
        </Text>

        <Text className="text-[#9CA3AF]">
          • CSV (.csv)
        </Text>

        <Text className="text-[#9CA3AF]">
          • Excel (.xlsx)
        </Text>

        <Text className="text-[#9CA3AF]">
          • Excel Legacy (.xls)
        </Text>
      </View>

      <Toast />
    </View>
  );
}