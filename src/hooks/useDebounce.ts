import {useEffect, useState} from 'react';

export default function useDebounce<Value extends number>(
  input: Value,
  wait: number,
) {
  const [value, setValue] = useState<Value>(input);

  useEffect(() => {
    const tid = setTimeout(() => setValue(input), wait);
    return () => clearTimeout(tid);
  }, [input, wait]);

  return value;
}
