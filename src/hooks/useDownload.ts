import { App } from 'antd';
import { useState } from 'react';

export const useDownload = () => {
  const { notification } = App.useApp();
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadFile = async (fileUrl: string, fileName: string) => {
    setIsDownloading(true);
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (_: any) {
      notification.error({
        message: 'Download Error',
        description: 'There was an error downloading the file. Please try again later.',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadExcelFile = async (fileBlob: Blob, fileName: string) => {
    const blob = fileBlob instanceof Blob ? fileBlob : new Blob([fileBlob]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return { downloadFile, downloadExcelFile, isDownloading };
};
