'use client'
import React, { ChangeEvent, useCallback, useState } from 'react';

interface UploadJSONProps {
  onUpload: (data: any) => void;
  setFileName: (fileName: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

function formatTime(durationMs: number): string {
  const seconds = Math.floor(durationMs / 1000);
  const milliseconds = Math.round(durationMs % 1000);
  if (seconds < 1) {
    return `${milliseconds}ms`;
  } else {
    return `${seconds}.${milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') : ''}${milliseconds}ms`;
  }
}

const UploadJSON: React.FC<UploadJSONProps> = ({ onUpload, setFileName, setLoading, loading }) => {
  const [loadingTime, setLoadingTime] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError('');
      onUpload(null);
      setLoading(true);
      setFileName(file.name);
      const startTime = performance.now();

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target!.result as string);
          const endTime = performance.now();
          const durationMs = endTime - startTime;

          setLoadingTime(formatTime(durationMs))
          onUpload(json);
          setLoading(false);
        } catch (error) {
          setError('Invalid file. Please load a valid JSON file.');
          setLoading(false);
        }
      };
      reader.readAsText(file);
    }
  }, [onUpload, setFileName, setLoading]);

  return (
    <div className="h-screen border w-full m-auto flex items-center justify-center flex-col text-center gap-4">
      <h1 className='text-5xl font-bold'>JSON Tree Viewer</h1>
      <p className='text-2xl'>Simple JSON Viewer that runs completely on-client. No data exchange</p>
      <div className="file-upload-wrapper">
        <label htmlFor="upload" className="file-upload-label">Load JSON</label>
        <input type="file" id="upload" className="file-upload-input" onChange={handleFileChange} accept=".json" />
      </div>
      {loading &&
        <div className="flex justify-center items-center h-[200px]">
          <div className="animate-spin h-14 w-14 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
        </div>
      }
      {error && <p className='text-red-500'>{error}</p>}
      {loadingTime && !error && (
        <>
          <p>Charging time: {loadingTime}</p>
          <div className="flex justify-center items-center">
            <svg
              className="w-8 h-8 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadJSON;
