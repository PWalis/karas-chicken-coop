"use client";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { londrina } from "@/ui/fonts"
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export function FAQ() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [alwaysOpen, setAlwaysOpen] = React.useState(true);
 
  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
 
  return (
    <>
    <section id="FAQ" className={londrina.className}>
      <Accordion open={alwaysOpen} icon={<Icon id={1} open={open} />}>
        <AccordionHeader className="font-londrina-solid" onClick={handleAlwaysOpen}>What is your return and refund policy?</AccordionHeader>
        <AccordionBody className="font-londrina-solid text-lg text-floc-gray/70">
          Currently at this time we are not offering returns or refunds. Please make sure that you have your correct sizing and your correct address to avoid any mistakes, and if there is any issue please reach out to us as soon as possible!
        </AccordionBody>
      </Accordion>
      <Accordion className="font-londrina-solid" open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader className="font-londrina-solid" onClick={() => handleOpen(2)}>
          How long is it going to take to receive my order?
        </AccordionHeader>
        <AccordionBody className="font-londrina-solid text-lg text-floc-gray/70">
          We hand pack and ship each item that we sell, so it can take anywhere from 2-3 business days for processing. After that, shipping can take up to 7-10 business days. We will provide you with a tracking number once we have received your order and will ship it out as soon as we can!
        </AccordionBody>
      </Accordion>
      <Accordion className="font-londrina-solid" open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader className="font-londrina-solid" onClick={() => handleOpen(3)}>
          Where does your store ship from?
        </AccordionHeader>
        <AccordionBody className="font-londrina-solid text-lg text-floc-gray/70">
          We are located in Oklahoma, USA and we ship all of our products out from there. We only ship to the United States. We are currently not offering international shipping, but will be adding that option in the future!
        </AccordionBody>
      </Accordion>
      </section>
    </>
  );
}