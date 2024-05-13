"use client";
import { motion } from "framer-motion";

interface AddToCartAlertProps {
    showAlert: boolean;
    dismissAlert: () => void; // This should be a function
  }
  
  export const AddToCartAlert: React.FC<AddToCartAlertProps> = ({ showAlert, dismissAlert }) => {
    return (
    <motion.div
      role="alert"
      className="fixed bottom-10 inset-x-2 sm:inset-x-auto sm:right-10 z-50 bg-yellow-200 p-6 rounded-lg flex justify-center items-center space-x-2"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: showAlert ? 1 : 0, x: showAlert ? 0 : "100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Your item has been added to the Cart!</span>
      <button onClick={dismissAlert} className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 4.236a1 1 0 011.414-1.414L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707A1 1 0 012 4.236z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      </div>
    </motion.div>
  );
}
