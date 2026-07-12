"use client";

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

/**
 * Animation primitives extracted from the "Prisma" motion language:
 *  - Word pull-up on headings (y:20 -> 0, staggered, once on view)
 *  - Fade-up on text/media (y:20 -> 0, custom ease, once on view)
 *  - Staggered card/media entrance (scale 0.95 + fade, once on view)
 * These only add motion; they never change layout or content.
 */

// Physics springs — the JS half of the motion system. The CSS sliding panels
// use $ease-spring, a linear() curve sampled from the same kind of spring, so
// everything shares one springy feel. SPRING drives content (words, fades),
// SPRING_POP adds a touch more life to scale-in cards/media.
const SPRING = { type: "spring", stiffness: 240, damping: 26, mass: 1 } as const;
const SPRING_POP = { type: "spring", stiffness: 260, damping: 21, mass: 1 } as const;

/* -------------------------------------------------------------------------- */
/* Word pull-up (headings)                                                    */
/* -------------------------------------------------------------------------- */

const wordsContainer: Variants = {
    hidden: {},
    show: ({ stagger, delay }: { stagger: number; delay: number }) => ({
        transition: { staggerChildren: stagger, delayChildren: delay },
    }),
};

const wordVariant: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: SPRING },
};

export function WordsPullUp({
    text,
    className,
    staggerDelay = 0.06,
    delay = 0,
    active,
}: {
    text: string;
    className?: string;
    staggerDelay?: number;
    delay?: number;
    // When provided, drives the animation from this flag (e.g. once a
    // background image has loaded) instead of the default scroll-into-view.
    active?: boolean;
}) {
    const words = text.split(" ");
    const triggerProps =
        active === undefined
            ? { whileInView: "show", viewport: { once: true } }
            : { animate: active ? "show" : "hidden" };

    return (
        <motion.span
            className={className}
            style={{ display: "inline" }}
            variants={wordsContainer}
            custom={{ stagger: staggerDelay, delay }}
            initial="hidden"
            {...triggerProps}
        >
            {words.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                    <motion.span
                        variants={wordVariant}
                        style={{ display: "inline-block" }}
                    >
                        {word}
                    </motion.span>
                    {index < words.length - 1 ? " " : ""}
                </Fragment>
            ))}
        </motion.span>
    );
}

/* -------------------------------------------------------------------------- */
/* Fade-up (paragraphs, subtitles, buttons, single media)                     */
/* -------------------------------------------------------------------------- */

export function FadeIn({
    children,
    as = "div",
    className,
    delay = 0,
    y = 20,
    scale,
    onClick,
    hover = false,
    style,
}: {
    children: ReactNode;
    as?: string;
    className?: string;
    delay?: number;
    y?: number;
    scale?: number;
    onClick?: () => void;
    hover?: boolean;
    style?: React.CSSProperties;
}) {
    const MotionTag = (motion as any)[as];

    return (
        <MotionTag
            className={className}
            style={style}
            onClick={onClick}
            initial={{ opacity: 0, y, ...(scale !== undefined && { scale }) }}
            whileInView={{ opacity: 1, y: 0, ...(scale !== undefined && { scale: 1 }) }}
            whileHover={hover ? { scale: 1.04 } : undefined}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...SPRING, delay }}
        >
            {children}
        </MotionTag>
    );
}

/* -------------------------------------------------------------------------- */
/* Staggered card / media entrance (grids, lists, carousels)                  */
/* -------------------------------------------------------------------------- */

const groupVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

export const staggerItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: SPRING_POP,
    },
};

export function StaggerGroup({
    children,
    as = "div",
    className,
}: {
    children: ReactNode;
    as?: string;
    className?: string;
}) {
    const MotionTag = (motion as any)[as];

    return (
        <MotionTag
            className={className}
            variants={groupVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
        >
            {children}
        </MotionTag>
    );
}

export function StaggerItem({
    children,
    as = "div",
    className,
}: {
    children: ReactNode;
    as?: string;
    className?: string;
}) {
    const MotionTag = (motion as any)[as];

    return (
        <MotionTag className={className} variants={staggerItemVariants}>
            {children}
        </MotionTag>
    );
}

// Link variant of a stagger item, for grids whose cells are <Link>s.
export const MotionLink = motion.create(Link);
