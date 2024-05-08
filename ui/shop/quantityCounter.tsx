import clsx from "clsx";

interface QuantityCounterProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantityLimit: {
    XS?: number;
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
    XXL?: number;
    limit?: number;
  };
  hasSizes: boolean;
  size: string;
}

export const QuantityCounter: React.FC<QuantityCounterProps> = ({
  quantity,
  setQuantity,
  quantityLimit,
  hasSizes,
  size,
}) => {
  const addHandler = () => {
    if (hasSizes) {
      if (quantityLimit[size as keyof typeof quantityLimit] && quantity >= quantityLimit[size as keyof typeof quantityLimit]!) {
        console.log("You have reached the limit for this size");
      } else {
        if (quantity < quantityLimit[size as keyof typeof quantityLimit]!) {
          setQuantity(quantity + 1);
        }
      }
    } else {
      if (quantity < quantityLimit.limit!) {
        setQuantity(quantity + 1);
      }
    }
  };

  const subtractHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={clsx(`flex mb-2`, size==="" ? "opacity-20" : "")}>
      <form className="flex flex-col justify-center max-w-xs">
        <label
          htmlFor="quantity-input"
          className="block text-md font-medium text-gray-900 dark:text-white"
        >
          Choose Quantity:
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={subtractHandler}
            data-input-counter-decrement="quantity-input"
            className={clsx("bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600  border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none", size==="" ? "" : "hover:bg-gray-200 border")}
            disabled={size===""}
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            value={quantity}
            data-input-counter
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1"
            typeof="number"
            required
            disabled
          />
          <button
            type="button"
            onClick={addHandler}
            id="increment-button"
            data-input-counter-increment="quantity-input"
            className={clsx("bg-gray-100 dark:g-gray-700 dark:hover:bg-gray-600 dark:border-gray-600  border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none", size==="" ? "hover:bg-gray-200 border" : "")}
            disabled={size===""}
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
