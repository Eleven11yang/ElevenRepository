import { useState } from 'react';

export default () => {
  const [level, setLevel] = useState<number>(1);

  return {
    level,
    setLevel,
  };
};
