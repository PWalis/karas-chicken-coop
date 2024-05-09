"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCart } from "@/app/context/cartContext";
import { formatCurrency } from "@/app/lib/utils";
import { useCartDispatch } from "@/app/context/cartContext";
import { NoItemsCheckout } from "../checkout/noItemsCheckout";
import Link from "next/link";
interface SlideCartProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SlideCart({ open, setOpen }: SlideCartProps) {
  const cart = useCart();
  const dispatch = useCartDispatch();

  const products = cart.items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      href: "#",
      color: "Salmon",
      price: item.priceInCents,
      quantity: item.quantity,
      imageSrc: item.primaryImage,
      imageAlt: item.description,
      itemId: item.itemId,
      size: item.size,
    };
  });

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const formattedSubtotal = formatCurrency(subtotal);

  const handleRemove = (itemId: string) => {
    dispatch({ type: "REMOVE", payload: itemId });
  };

  const size = (productSize: string) => {
    switch (productSize) {
      case "XS":
        return "Extra Small";
      case "S":
        return "Small";
      case "M":
        return "Medium";
      case "L":
        return "Large";
      case "XL":
        return "Extra Large";
      case "XXL":
        return "2XL";
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75  backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-6">
                        <div className="flex items-start justify-between sticky top-0 bg-white/70 backdrop-blur-sm h-fill pt-3 pb-2">
                          <Dialog.Title className="text-lg font-medium text-gray-900 uppercase">
                            Shopping Cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
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
                        </div>

                        <div className="mt-8">
                          {products.length === 0 ? (
                            <NoItemsCheckout />
                          ) : (
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {products.map((product, index) => (
                                  <li key={index} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={product.href}>
                                              {product.name}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            {formatCurrency(product.price)}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {size(product.size)}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Qty {product.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            onClick={() =>
                                              handleRemove(product.itemId)
                                            }
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{formattedSubtotal}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          {cart.items.length !== 0 && (
                            <Link href="/checkout">
                              <button className="w-full flex items-center justify-center rounded-md border border-transparent bg-floc-yellow px-6 py-3 text-base font-medium text-floc-gray uppercase shadow-sm hover:bg-floc-yellow/70">
                                Checkout
                              </button>
                            </Link>
                          )}
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <Link href="/shop">
                              <button
                                type="button"
                                className="font-medium text-floc-gray/80 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
