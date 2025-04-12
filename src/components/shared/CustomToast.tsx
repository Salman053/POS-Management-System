// components/alerts/CustomToast.tsx
import { toast } from "react-toastify";

interface CustomToastProps {
  id: string;
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ id, message }) => {
  const handleDismiss = () => {
    toast.dismiss(); // close toast
  };

  const handleDontShowAgain = () => {
    const dismissed = JSON.parse(localStorage.getItem("dismissedAlerts") || "[]");
    localStorage.setItem("dismissedAlerts", JSON.stringify([...dismissed, id]));
    toast.dismiss(); // close toast
  };

  return (
    <div className="flex flex-col gap-1">
      <p>{message}</p>
      <div className="flex justify-end gap-2 mt-1">
        <button
          onClick={handleDismiss}
          className="text-blue-600 hover:underline text-sm"
        >
          Got it
        </button>
        <button
          onClick={handleDontShowAgain}
          className="text-red-600 hover:underline text-sm"
        >
          Don’t show again
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
