import { memo } from 'react';

function MobileOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

export default memo(MobileOverlay);
