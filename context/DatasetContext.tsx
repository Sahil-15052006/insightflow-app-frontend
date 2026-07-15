import {
    createContext,
    useContext,
    useState,
    ReactNode,
  } from "react";
  
  interface DatasetContextType {
    uploadResponse: any;
    setUploadResponse: (data: any) => void;
    clearUploadResponse: () => void;
  }
  
  const DatasetContext = createContext<DatasetContextType | null>(null);
  
  export const DatasetProvider = ({
    children,
  }: {
    children: ReactNode;
  }) => {
    const [uploadResponse, setUploadResponse] = useState<any>(null);
  
    const clearUploadResponse = () => {
      setUploadResponse(null);
    };
  
    return (
      <DatasetContext.Provider
        value={{
          uploadResponse,
          setUploadResponse,
          clearUploadResponse,
        }}
      >
        {children}
      </DatasetContext.Provider>
    );
  };
  
  export const useDataset = () => {
    const context = useContext(DatasetContext);
  
    if (!context) {
      throw new Error(
        "useDataset must be used within DatasetProvider"
      );
    }
  
    return context;
  };