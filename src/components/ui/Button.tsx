'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:shadow-[0_0_15px_rgba(14,165,233,0.5)]',
    secondary: 'bg-transparent border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white',
    accent: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    ghost: 'bg-transparent text-gray-300 hover:bg-white/5 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = twMerge(baseStyles, variants[variant], sizes[size], className);

  const inner = (
    <>
      {children}
      {icon && <span className="ml-2 transition-transform group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {inner}
    </motion.button>
  );
}
