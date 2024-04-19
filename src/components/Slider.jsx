import React, { useRef, useState } from 'react';
import { useUpdateEffect } from '../hooks/useEffect';
import { clamp, clsx, roundToStep } from '../utils';
import Box from './Box';

// https://nextui.org/docs/components/slider

const variants = {
  flat: {
    default:
      'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700',
  },
};

const sizes = {
  sm: 'rounded-lg h-8',
  md: 'rounded-xl h-10',
  lg: 'rounded-2xl h-12',
  xl: 'rounded-2xl h-14',
};

export const Slider = ({
  className,
  size = 'sm',
  variant = 'flat',
  color = 'default',
  isDisabled = false,
  isReadOnly = false,
  showSteps = false,
  max = 100,
  min = 0,
  value = 10,
  step = 1,
  startContent,
  endContent,
  onChange,
  onChangeEnd,
  ...props
}) => {
  const ref = useRef(null);
  const [_value, setValue] = useState(value);

  const handleValue = (event) => {
    const posX = event.clientX || event.touches.item(0).clientX;
    const { left, width } = ref.current.getBoundingClientRect();
    const proportion = clamp(posX - left, 0, width) / width;
    const value = roundToStep(Math.floor(max * proportion), step);

    if (_value === value || value < min || value > max) return;

    setValue(value);
    if (onChange) onChange(value);
  };

  const addListeners = () => {
    document.onmousemove = onMove;
    document.ontouchmove = onMove;
    document.onmouseup = onEnd;
    document.ontouchend = onEnd;
  };

  const removeListeners = () => {
    document.onmousemove = null;
    document.ontouchmove = null;
    document.onmouseup = null;
    document.ontouchend = null;
  };

  const onMove = (event) => handleValue(event);

  const onEnd = (event) => {
    event.target.classList.replace('cursor-grabbing', 'cursor-grab');

    removeListeners();
  };

  const onStart = (event) => {
    event.preventDefault();

    event.target.classList.replace('cursor-grab', 'cursor-grabbing');

    handleValue(event);

    addListeners();
  };

  useUpdateEffect(() => {
    if (_value !== value) setValue(value);
  }, [value]);

  useUpdateEffect(() => {
    addListeners();
  }, [_value]);

  return (
    <Box
      {...props}
      ref={ref}
      className={clsx(
        'overflow-hidden cursor-grab',
        isDisabled && 'opacity-50 pointer-events-none',
        sizes[size],
        variants[variant][color],
        className
      )}
      onMouseDown={onStart}
      onTouchStart={onStart}
    >
      <Box
        className="bg-white h-full transition-all"
        style={{ width: (_value / max) * 100 + '%' }}
      />
    </Box>
  );
};

export default Slider;
