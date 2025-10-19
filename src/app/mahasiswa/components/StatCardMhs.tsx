'use client';

import { useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useRouter } from 'next/navigation';

interface StatCardProps {
  title: string;
  value: number;
  variant?: 'submitted' | 'verified' | 'completed';
  prefix?: string;
  suffix?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const hoverTap = {
  whileHover: {
    scale: 1.03,
    boxShadow: '0 12px 30px rgba(10,28,86,0.18)',
    transition: { duration: 0.2 },
  },
  whileTap: { scale: 0.98 },
};

export default function StatCard({
  title,
  value,
  variant = 'submitted',
  prefix = '',
  suffix = '',
}: StatCardProps) {
  const bgColor = {
    submitted: 'bg-gradient-to-br from-[#082047] to-[#0A1A4A]',
    verified: 'bg-gradient-to-br from-[#082047] to-[#0A1A4A]',
    completed: 'bg-gradient-to-br from-[#082047] to-[#0A1A4A]',
  }[variant];

  const accentColor = {
    submitted: 'bg-[#FFC107]',
    verified: 'bg-[#1976D2]',
    completed: 'bg-[#4CAF50]',
  }[variant];

  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const router = useRouter();

  // navigation logic:
  const handleNavigate = () => {
    // If variant completed -> riwayat, otherwise -> status
    if (variant === 'completed') {
      router.push('/mahasiswa/RiwayatSurat');
    } else {
      router.push('/mahasiswa/StatusSurat');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate();
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      {...hoverTap}
      className={`relative overflow-hidden text-white rounded-2xl p-6 shadow-lg ${bgColor} cursor-pointer`}
      role="button"
      tabIndex={0}
      aria-pressed="false"
      aria-label={`${title} - buka halaman terkait`}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
    >
      {/* decorative accent circle top-right */}
      <motion.div
        aria-hidden
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-10"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(255,255,255,0.00) 40%)',
        }}
        initial={{ scale: 0, rotate: 0 }}
        animate={inView ? { scale: 1, rotate: 180 } : { scale: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* header: accent + title in one line */}
      <motion.div className="flex items-center justify-between" variants={itemVariants}>
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            className={`w-3 h-3 rounded-full ${accentColor}`}
          />
          <h3 className="text-sm md:text-base font-semibold tracking-wide opacity-95" style={{ letterSpacing: '0.3px' }}>
            {title}
          </h3>
        </div>
      </motion.div>

      <motion.div className="mt-6" variants={itemVariants}>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 }}
          className="flex items-baseline gap-3"
        >
          <span className="text-4xl md:text-5xl font-extrabold leading-none tabular-nums">
            <CountUp start={inView ? 0 : undefined} end={value} duration={1.2} separator="." redraw={false}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </span>

          {suffix && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={inView ? { opacity: 0.95, x: 0 } : { opacity: 0, x: 6 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="text-sm md:text-base font-semibold opacity-90"
            >
              {suffix}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
