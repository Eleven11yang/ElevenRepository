import React, { useCallback, useEffect, useState } from 'react';
import { Link, useModel } from 'umi';
import cartoon from './image/cartoon.jpg';
import TakePicturesBackground from './image/TakePicturesBackground.jpg';
import styles from './index.less';

type state = {
  runLength: number;
  styleVar: Record<string, string>;
  pictureStyle: Record<string, string>;
  pictureState: boolean;
  startState: boolean;
  animationTime: number;
};

const TakePictures2: React.FC = () => {
  const { level } = useModel('LevelModel', (model) => {
    return {
      level: model.level,
    };
  });
  const areaWidth = 1200;
  const pictureListItemWidth = 50;
  let startTime = 0;
  const defaultStyle = {
    height: '50px',
    top: '25%',
    position: 'absolute',
    transform: `translateX(${areaWidth}px)`,
  };
  const defaultPictureStyle = {
    width: '200px',
    height: '100px',
    position: 'absolute',
    border: '2px solid red',
    transform: 'translateX(500px)',
  };
  const [forRun, setForRun] = useState<state>({
    runLength: 0,
    styleVar: { ...defaultStyle },
    pictureStyle: { ...defaultPictureStyle },
    pictureState: false,
    startState: true,
    animationTime: 3,
  });

  // 根据level的值，更改取景框样式。
  const selectLevel = () => {
    if (level === 1) {
      setForRun({
        ...forRun,
        animationTime: 3,
        pictureStyle: {
          ...defaultPictureStyle,
        },
      });
    } else if (level === 2) {
      setForRun({
        ...forRun,
        animationTime: 2,
        pictureStyle: {
          width: '150px',
          height: '100px',
          position: 'absolute',
          border: '2px solid red',
          transform: 'translateX(525px)',
        },
      });
    } else {
      setForRun({
        ...forRun,
        animationTime: 1.5,
        pictureStyle: {
          width: '100px',
          height: '100px',
          position: 'absolute',
          border: '2px solid red',
          transform: 'translateX(550px)',
        },
      });
    }
  };

  useEffect(() => {
    selectLevel();
  }, [level]);

  // 监听到初始状态改变，获取当前时间赋给start Time，在animationTime*1000+500ms之后，回到初始状态
  useEffect(() => {
    if (forRun.styleVar?.transition) {
      startTime = new Date().valueOf();
      setTimeout(() => {
        setForRun({ ...forRun, styleVar: { ...defaultStyle } });
        console.log(forRun.runLength, forRun.pictureState);
      }, forRun.animationTime * 1000 + 500);
    }
  }, [forRun]);

  // 开始运行动画
  const startTakePictures = () => {
    setForRun({
      ...forRun,
      styleVar: {
        height: '50px',
        top: '25%',
        position: 'absolute',
        transition: `all ${forRun.animationTime}s linear`,
        transform: `translateX(${-1 * pictureListItemWidth}px )`,
      },
    });
  };

  // 判断当前是否接收回车按键(a && b),记录按键时间,当开始时间为0时，代表准备开始游戏，否则是对动画截取，其次对数据进行处理,阻止本次播放过程中再次按键。
  const handleEnterKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Enter' && startTime != 0) {
        const endTime = new Date().valueOf();
        const runTime = endTime - startTime;
        const currentLength =
          ((areaWidth + pictureListItemWidth) / forRun.animationTime / 1000) * runTime;
        let isOk: boolean;
        if (level === 1) {
          isOk = currentLength >= 550 && currentLength <= 700;
        } else if (level === 2) {
          isOk = currentLength >= 575 && currentLength <= 675;
        } else {
          isOk = currentLength >= 600 && currentLength <= 650;
        }
        forRun.pictureState = isOk;
        forRun.runLength = currentLength;
        console.log(forRun.runLength, forRun.pictureState);
        startTime = 0;
      } else {
        startTakePictures();
      }
    },
    [forRun, level],
  );

  //监听文档的enter事件，当此组件销毁时，enter事件删除
  useEffect(() => {
    document.addEventListener('keypress', handleEnterKey);
    return () => {
      document.removeEventListener('keypress', handleEnterKey);
    };
  }, [handleEnterKey]);

  return (
    <div className={styles.mainContent}>
      <div className={styles.GameATitle}>
        <h1>Game B: 拍照</h1>
        <h2>
          <b>
            屏幕中红色方框为取景区，皮卡丘图片快速直线横穿屏幕。enter键开始，请玩家在图片到达取景区时按下enter键，图片完全处于取景区内游戏成功。
          </b>
        </h2>
      </div>
      <div className={styles.cartoon}>
        <div
          style={{
            width: `${areaWidth}px`,
            height: '100px',
            backgroundImage: `url(${TakePicturesBackground})`,
            margin: '10px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={forRun.styleVar}>
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundImage: `url(${cartoon})`,
              }}
            />
          </div>
          <div style={forRun.pictureStyle} />
        </div>
        <div
          style={{
            width: '1200px',
            height: '100px',
            background: 'lightgrey',
            overflow: 'hidden',
            position: 'relative',
            margin: '10px',
          }}
        >
          {forRun.pictureState && (
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundImage: `url(${cartoon})`,
                position: 'absolute',
                transform: `translateX(${1200 - forRun.runLength}px )`,
              }}
            />
          )}
          <div
            style={{
              width: '200px',
              height: '100px',
              position: 'absolute',
              border: '2px solid green',
              transform: 'translateX(500px)',
            }}
          />
        </div>
      </div>
      <Link to="/">
        <button className={styles.nextButton} disabled={!forRun.pictureState}>
          重新开始
        </button>
      </Link>
    </div>
  );
};
export default TakePictures2;
