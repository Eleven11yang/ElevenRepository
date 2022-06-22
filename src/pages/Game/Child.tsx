import React from 'react';
import { useLocation } from 'umi';

// type ChildType = {
//   level: number;
// };
interface stateType {
  userName: string;
}

const Child: React.FC = () => {
  // const { level } = props;
  //使用钩子获取state
  const { state } = useLocation<stateType>();
  console.log(state.userName);
  return (
    <>
      <h1>{state.userName}</h1>
    </>
  );
};

export default Child;
