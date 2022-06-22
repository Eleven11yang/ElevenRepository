import React from 'react';
import { Link, useModel } from 'umi';
import styles from './index.less';
const Game: React.FC = () => {
  const { level, setLevel } = useModel('LevelModel', (model) => {
    return {
      level: model.level,
      setLevel: model.setLevel,
    };
  });

  return (
    <div>
      <div className={styles.selectLevel}>
        <h3 style={{ color: 'red' }}>
          请注意：只有成功完成gameA，才能到达gameB，gameB成功后可返回初始界面
        </h3>
        <h2>选择难度:</h2>
        <div className={styles.levelButtonBox}>
          <button
            className={`${styles.levelButton} ${styles.levelButton1}`}
            onClick={() => {
              setLevel(1);
            }}
          >
            easy
          </button>
        </div>
        <div className={styles.levelButtonBox}>
          <button
            className={`${styles.levelButton} ${styles.levelButton2}`}
            onClick={() => {
              setLevel(2);
            }}
          >
            middle
          </button>
        </div>
        <div className={styles.levelButtonBox}>
          <button
            className={`${styles.levelButton} ${styles.levelButton3}`}
            onClick={() => {
              setLevel(3);
            }}
          >
            difficult
          </button>
        </div>
      </div>
      <div className={styles.InfoText}>
        <h1>玩家选择的难度是第{level}级！</h1>
        <button className={styles.startButton}>
          <Link to="/Game/CountPeople1">准备开始</Link>
        </button>
      </div>
    </div>
  );
};

export default Game;
