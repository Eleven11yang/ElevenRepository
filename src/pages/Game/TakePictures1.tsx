import React, { useEffect, useState } from 'react';
import { Link, useModel } from 'umi';
import cartoon from './image/cartoon.jpg';
import TakePicturesBackground from './image/TakePicturesBackground.jpg';

type PictureParamItem = boolean;
type state = {
  startTime: number;
  runLength: number;
  styleVar: Record<string, string>;
  getPictureStyle: Record<string, string>;
};

const TakePictures: React.FC = () => {
  const { level } = useModel('LevelModel', (model) => {
    return {
      level: model.level,
    };
  });
  const areaWidth = 1200;
  const pictureListItemWidth = 50;
  const [animationTime, setAnimationTime] = useState(4);
  const defaultStyle = {
    height: '100px',
    top: '25%',
    position: 'absolute',
    transform: `translateX(${areaWidth}px)`,
  };
  const defaultGetPictureStyle = {
    width: '200px',
    height: '100px',
    position: 'absolute',
    border: '2px solid red',
    transform: 'translateX(500px)',
  };
  const [pictureList, setPictureList] = useState<PictureParamItem[]>([]);
  const [playState, setPlayState] = useState(false);
  const [pictureState, setPictureState] = useState(false);
  const [forRun, setForRun] = useState<state>({
    startTime: 0,
    runLength: 0,
    styleVar: { ...defaultStyle },
    getPictureStyle: { ...defaultGetPictureStyle },
  });

  const selectLevel = () => {
    if (level === 1) {
      setAnimationTime(4);
      setForRun({
        ...forRun,
        getPictureStyle: {
          ...defaultGetPictureStyle,
        },
      });
    } else if (level === 2) {
      setAnimationTime(3);
      setForRun({
        ...forRun,
        getPictureStyle: {
          width: '150px',
          height: '100px',
          position: 'absolute',
          border: '2px solid red',
          transform: 'translateX(525px)',
        },
      });
    } else {
      setAnimationTime(2.5);
      setForRun({
        ...forRun,
        getPictureStyle: {
          width: '100px',
          height: '100px',
          position: 'absolute',
          border: '2px solid red',
          transform: 'translateX(550px)',
        },
      });
    }
  };

  const resetPictureList = () => {
    const rows: PictureParamItem[] = [true];
    setPictureList(rows);
  };

  const renderPictureListItem = (key: number): React.ReactNode => {
    return (
      <div
        key={key}
        style={{
          width: '50px',
          height: '50px',
          backgroundImage: `url(${cartoon})`,
        }}
      />
    );
  };

  useEffect(() => {
    if (pictureList.length > 0) {
      setForRun({
        ...forRun,
        startTime: new Date().valueOf(),
        styleVar: {
          height: '100px',
          top: '25%',
          position: 'absolute',
          transition: `all ${animationTime}s linear`,
          transform: `translateX(${-1 * pictureListItemWidth * pictureList.length}px )`,
        },
      });
    }
  }, [pictureList]);

  const play = () => {
    setPlayState(true);
    setTimeout(() => {
      setPlayState(false);
      setForRun({ ...forRun, styleVar: { ...defaultStyle } });
      setPictureList([]);
    }, animationTime * 1000 + 500);
  };

  useEffect(() => {
    if (forRun.styleVar && forRun.styleVar.transition) {
      play();
    }
  }, [forRun]);

  // 按键enter，计算从开始到当前的运行时间，得到当前距离，判断是否能截图显示。
  const handleEnterKey = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      const endTime = new Date().valueOf();
      const runTime = endTime - forRun.startTime;
      const currentLength = ((areaWidth + pictureListItemWidth) / animationTime / 1000) * runTime;
      let isOk: boolean;
      if (level === 1) {
        isOk = currentLength >= 550 && currentLength <= 700;
      } else if (level === 2) {
        isOk = currentLength >= 575 && currentLength <= 625;
      } else {
        isOk = currentLength >= 600 && currentLength <= 650;
      }
      setPictureState(isOk);
      forRun.runLength = currentLength;
      setForRun({ ...forRun });
      console.log(runTime, forRun.runLength, isOk, pictureState);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleEnterKey);
    if (playState === false) {
      document.removeEventListener('keypress', handleEnterKey);
    }
  }, [handleEnterKey]);

  useEffect(() => {
    selectLevel();
  }, [level]);

  // 开始运行
  const startTakePictures = () => {
    resetPictureList();
  };

  return (
    <>
      <div>
        <h1>Game B: 拍照</h1>
        <h1>
          <b>
            点击开始，屏幕中红色方框为取景区，一个皮卡丘图片快速直线横穿屏幕。请玩家在图片到达取景区时按下enter键，图片完全处于取景区内游戏成功。
          </b>
        </h1>
        <button onClick={startTakePictures} disabled={playState}>
          START
        </button>
      </div>
      <div>
        <div
          style={{
            width: `${areaWidth}px`,
            height: '100px',
            backgroundImage: `url(${TakePicturesBackground})`,
            margin: 'auto',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={forRun.styleVar}>
            {pictureList.map((_, key) => renderPictureListItem(key))}
          </div>
          <div style={forRun.getPictureStyle} />
        </div>
        <div
          style={{
            width: '1200px',
            height: '100px',
            background: 'lightgrey',
            overflow: 'hidden',
            position: 'relative',
            margin: 'auto',
            marginTop: '50px',
          }}
        >
          {pictureState && (
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
      <button>
        <Link to="/welcome">重新开始</Link>
      </button>
    </>
  );
};
export default TakePictures;
