import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // 1. Track cursor movement and pointer type dynamically
    const updateMousePosition = (e: PointerEvent) => {
      // If the input device is touch, we disable the custom cursor
      if (e.pointerType === 'touch') {
        setIsTouchDevice(true);
        setIsVisible(false);
        return;
      }
      
      // If it's a mouse/pen, enable the custom cursor
      setIsTouchDevice(false);
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // 2. Track click actions (only for pointer events)
    const handleMouseDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      setIsClicking(true);
    };
    const handleMouseUp = () => setIsClicking(false);

    // 3. Detect hover on links, buttons, and custom '.cursor-hover' elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Attach pointer/mouse event listeners
    window.addEventListener('pointermove', updateMousePosition);
    window.addEventListener('pointerdown', handleMouseDown);
    window.addEventListener('pointerup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('pointermove', updateMousePosition);
      window.removeEventListener('pointerdown', handleMouseDown);
      window.removeEventListener('pointerup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  // Manage the body class dynamically so the cursor is hidden only when the custom cursor is active
  useEffect(() => {
    const shouldShow = isVisible && !isTouchDevice;
    if (shouldShow) {
      document.body.classList.add('has-custom-cursor');
    } else {
      document.body.classList.remove('has-custom-cursor');
    }

    return () => {
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. Main Cursor Dot */}
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.2,
        }}
      />

      {/* 2. Outer Trailing Ring */}
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2.5 : 1.2,
          opacity: isHovering ? 0.6 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      />

      {/* 3. Click Wave Effect */}
      {isClicking && (
        <motion.div
          className="custom-cursor-click"
          initial={{ 
            x: mousePosition.x - 32, 
            y: mousePosition.y - 32, 
            scale: 0,
            opacity: 1 
          }}
          animate={{ 
            scale: 2,
            opacity: 0 
          }}
          transition={{ duration: 0.4 }}
        />
      )}
    </>
  );
};

export default CustomCursor;
