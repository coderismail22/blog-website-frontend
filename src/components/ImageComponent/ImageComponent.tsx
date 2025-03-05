const ImageComponent = ({ src, width, height, alt, className, ...props }) => {
  return (
    <img
      src={src ? (src == "" ? "/default.jpg" : src) : "/default.jpg"}
      width={width}
      height={height}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default ImageComponent;
