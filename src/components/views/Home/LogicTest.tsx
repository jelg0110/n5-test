import { useEffect, useState } from 'react';
import styles from './Home.module.scss';

interface LogicTestType {
  open: boolean
}

function LogicTest({ open }: LogicTestType) {
  const [value, setValue] = useState('');
  const [reversedValue, setReversedValue] = useState('');

  useEffect(() => {
    setValue('');
    setReversedValue('');
    // eslint-disable-next-line
  }, [open])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleRevert = () => {
    const charPositions: number[] = [];
    const letters: string[] = [];
    const chars = value.split('');

    chars.forEach((char, i) => {
      const ascii = char.charCodeAt(0);
      if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
        charPositions.push(i);
        letters.push(char);
      }
    });

    letters.reverse();

    charPositions.forEach((p, i) => {
      chars[p] = letters[i];
    });

    setReversedValue(chars.join(''));
  }

  return (
    <div className={styles.ProductForm}>
      <input type="text" value={value} onChange={handleChange}  />
      <input type="text" value={reversedValue} readOnly />
      <button type='button' className='Button' onClick={handleRevert}>
        Invertir
      </button>
    </div>
  )
}

export default LogicTest;