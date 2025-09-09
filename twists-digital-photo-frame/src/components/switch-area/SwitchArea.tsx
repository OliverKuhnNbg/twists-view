import { AnimatePresence, motion } from 'framer-motion';
import PagingButton from '../gallery-paging-button/PagingButton';

interface SwitchAreaProps {
  isHiden: boolean;
}

function SwitchArea({ isHiden }: SwitchAreaProps) {
  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.8 },
  };

  return (
    <AnimatePresence>
      {!isHiden && (
        <motion.div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          {...fadeAnimation}
        >
          <PagingButton direction="left" />
          <PagingButton direction="right" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SwitchArea;
