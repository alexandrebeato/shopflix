import Spinner from '../Spinner';

interface ButtonProps {
  disabled: boolean;
  loading: boolean;
  text: string;
}

export default function Button({ disabled, loading, text }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full h-10 flex items-center justify-center cursor-pointer px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#D9232E] rounded-md  disabled:bg-[#ec8a90] disabled:cursor-default focus:outline-none "
    >
      {loading ? <Spinner className="w-6 h-6" /> : text}
    </button>
  );
}
