import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ImageDownload = () => {
  const imageUrl = 'https://via.placeholder.com/400'; // Replace with actual image URL
  const imageName = 'downloaded-image.jpg';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg w-fit'>
      <img
        src={imageUrl}
        alt='Downloadable'
        className='w-64 h-64 rounded-lg shadow'
      />
      <Button onClick={handleDownload} className='flex items-center gap-2'>
        <Download className='w-5 h-5' /> Download Image
      </Button>
    </div>
  );
};

export default ImageDownload;
