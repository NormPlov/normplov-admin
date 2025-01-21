import React from "react";

type QuizInterestResultCardProps = {
  title: string;
  desc: string;
  image: string;
};

export const QuizInterestResultCard: React.FC<QuizInterestResultCardProps> = ({
  title,
  desc,
  image,
}) => {
  // Dynamically prepend the base API URL if the image is not external
  const formattedImage = image.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_NORMPLOV_API}${image}`
    : image;

  return (
    <div className="card">
      <ImageWithFallback
        src={formattedImage}
        alt={title}
        fallbackSrc="/assets/placeholder.jpg"
        width={1000}
        height={1000}
        className="card-image w-3/4"
      />
      <div className="card-content">
        <h3 className="card-title text-primary">{title}</h3>
        <p className="card-description text-textprimary">{desc}</p>
      </div>
    </div>
  );
};

// Custom ImageWithFallback Component
type ImageWithFallbackProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className,
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleImageError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc); // Set fallback image only once
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleImageError}
    />
  );
};
