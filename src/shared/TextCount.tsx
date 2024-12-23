type TextCountProps = {
  text: string;
  maxLength?: number;
  className?: string;
};

const TextCount = ({ text, maxLength, className }: TextCountProps) => {
  return (
    maxLength && (
      <div className={className}>
        {text.length}/{maxLength}
      </div>
    )
  );
};

export default TextCount;
