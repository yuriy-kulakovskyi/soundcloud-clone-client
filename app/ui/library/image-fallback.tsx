import React from "react";

interface ImageProps {
  imageUrl: string;
  fallbackUrl: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageProps> = ({ 
  imageUrl, 
  fallbackUrl, 
  alt 
}) => {
  const [src, setSrc] = React.useState(imageUrl);

  const handleError = () => {
    setSrc(fallbackUrl);
  };

  return (
    <img
      className="object-cover absolute w-full h-full"
      src={src}
      alt={alt}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;