'use client';

import { motion, useScroll, AnimatePresence } from "framer-motion";

interface Props {
    children: React.ReactNode;
    delay?: number;
}

export const SectionWrapper = ({ children, delay =.50 }: Props) => (
<AnimatePresence>
<motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: .50 }}
    viewport={{ once: true }} >
{children}
</motion.section>
</AnimatePresence>
    );