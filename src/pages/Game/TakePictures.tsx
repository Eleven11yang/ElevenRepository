import React, { useEffect, useState } from 'react';

type PictureParamItem = boolean;
type state = {
  startTime: number;
  runLength: number;
  styleVar: Record<string, string>;
};

const TakePictures: React.FC = () => {
  const areaWidth = 1200;
  const pictureListItemWidth = 100;
  const animationTime = 4;
  const defaultStyle = {
    height: '100px',
    position: 'absolute',
    transform: `translateX(${areaWidth}px)`,
  };
  const [pictureList, setPictureList] = useState<PictureParamItem[]>([]);
  const [playState, setPlayState] = useState(false);
  const [pictureState, setPictureState] = useState(false);
  const [forRun, setForRun] = useState<state>({
    startTime: 0,
    runLength: 0,
    styleVar: { ...defaultStyle },
  });

  const resetPictureList = () => {
    const rows: PictureParamItem[] = [true];
    setPictureList(rows);
  };

  const renderPictureListItem = (key: number): React.ReactNode => {
    return (
      <div
        key={key}
        style={{
          width: '100px',
          height: '100px',
          background: 'black',
        }}
      />
    );
  };

  useEffect(() => {
    if (pictureList.length > 0) {
      console.log('111:', pictureList);
      setForRun({
        ...forRun,
        startTime: new Date().valueOf(),
        styleVar: {
          height: '100px',
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
  }, [forRun.styleVar]);

  // 按键enter，计算从开始到当前的运行时间，得到当前距离，判断是否能截图显示。
  const handleEnterKey = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      const endTime = new Date().valueOf();
      console.log(forRun.startTime, endTime);
      const runTime = (endTime - forRun.startTime!) / 1000;
      const currentLength = (areaWidth / animationTime) * runTime;
      const isOk =
        currentLength >= areaWidth / 2 && currentLength <= areaWidth / 2 + pictureListItemWidth;
      setPictureState(isOk);
      forRun.runLength = currentLength;
      setForRun({ ...forRun });
      console.log(runTime, forRun.runLength, isOk);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleEnterKey);
    if (!playState) {
      document.removeEventListener('keypress', handleEnterKey);
    }
  }, [handleEnterKey]);

  // 开始运行
  const startTakePictures = () => {
    resetPictureList();
  };

  return (
    <>
      <div>
        <button onClick={startTakePictures} disabled={playState}>
          START
        </button>
      </div>
      <div>
        <div
          style={{
            width: `${areaWidth}px`,
            height: '100px',
            background: 'lightBlue',
            margin: 'auto',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={forRun.styleVar!}>
            {pictureList.map((_, key) => renderPictureListItem(key))}
          </div>
          <div
            style={{
              width: '200px',
              height: '100px',
              position: 'absolute',
              border: '2px solid red',
              transform: 'translateX(500px)',
            }}
          />
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              background: 'lightgrey',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {pictureState && (
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  top: '25%',
                  background: 'black',
                  position: 'absolute',
                  transform: `translateX(${700 - forRun.runLength}px )`,
                }}
              />
            )}

            <div
              style={{
                width: '200px',
                height: '100px',
                top: '25%',
                position: 'absolute',
                border: '2px solid red',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default TakePictures;
