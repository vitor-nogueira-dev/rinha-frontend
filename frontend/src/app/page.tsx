'use client';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const UploadJSON = dynamic(
  () => import('../components/UploadJSON'),
  { ssr: false }
);

const JSONTreeViewer = lazy(() => import('../components/JSONTreeViewer'));

const Home: React.FC = () => {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    if (jsonData) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, [jsonData]);

  return (
    <div>
      <UploadJSON onUpload={setJsonData} setFileName={setFileName} setLoading={setLoading} loading={loading} />

      {jsonData && (
        <Suspense>
          {fileName && <h1 className='text-3xl font-bold text-center z-10 h-10'>{fileName}</h1>}
          <div className='z-0'>
            <JSONTreeViewer data={jsonData} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default Home;
