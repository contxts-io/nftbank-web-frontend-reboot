'use client';
import styles from './ToggleButton.module.css';
import Circle from '@/public/icon/Circle';
import ToggleRect from '@/public/icon/ToggleRect';
import { useState } from 'react';

const Rect = ({ on, onClick }: { on: boolean; onClick: () => void }) => {
  return (
    <div className={`${styles.rect} ${on && styles.active}`} onClick={onClick}>
      <ToggleRect />
    </div>
  );
};
const CircleComponent = ({ on }: { on: boolean }) => {
  return (
    <div className={`${styles.circle} ${on ? styles.on : styles.off}`}>
      <Circle width={16} height={16} />
    </div>
  );
};
const ToggleButton = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={styles.toggleButton}>
      {/* <Rect on={isOn} onClick={handleToggle} />
      <CircleComponent on={isOn} /> */}
      <ToggleRect className={styles.toggleRect} />
      {/* <Circle className={styles.circle} /> */}
    </div>
  );
};
export default ToggleButton;
