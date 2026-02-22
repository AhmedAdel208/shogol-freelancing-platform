export interface UseOtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}
