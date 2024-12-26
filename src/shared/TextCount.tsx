'use client';

type TextCountProps = {
  text: number;
  maxLength?: number;
  className?: string;
};

const TextCount = ({ text, maxLength, className }: TextCountProps) => {
  return (
    maxLength && (
      <div className={className}>
        {text}/{maxLength}
      </div>
    )
  );
};

export default TextCount;
