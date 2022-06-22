import { useEffect, useState } from 'react';
import { Link, useModel } from 'umi';
import Background from './image/background.jpg';
import grass from './image/grass.jpg';
import personManPicture from './image/man.jpg';
import personPicture from './image/picture.jpg';
import personWomanPicture from './image/woman.jpg';
import styles from './index.less';

type ImageParamListItem = [boolean, boolean, boolean, boolean];
type state = {
  buttonState: boolean;
  playState: boolean;
  animationTime: number;
  styleVar: Record<string, string>;
};

const CountPeople1: React.FC = () => {
  const { level } = useModel('LevelModel', (model) => {
    return {
      level: model.level,
    };
  });
  /* 
  定义参数舞台宽度(layoutWidth)为1200px;
  定义参数图片数组中每个元素的宽度(imageParamListItemWidth)为100px;
  定义变量imageParamList初始状态为空数组，类型为ImageParamListItem[];
*/
  const [imageParamList, setImageParamList] = useState<ImageParamListItem[]>([]);
  const layoutWidth = 1200;
  const imageParamListItemWidth = 100;
  const defaultStyle = {
    height: '100px',
    transform: `translateX(${layoutWidth}px)`,
    float: 'left',
  };
  // 初始状态
  const [forRun, setForRun] = useState<state>({
    buttonState: true,
    playState: false,
    animationTime: 2,
    styleVar: { ...defaultStyle },
  });

  useEffect(() => {
    console.log(level);
  }, [level]);

  // 取固定范围的随机数
  const randomNum = (max: number, min: number) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  };

  // 填充图片数组（展示随机数量的图片，每个图片的头像个数随机）
  const paddingImageParamList = () => {
    const rows: ImageParamListItem[] = [];
    let totalRows: number;
    if (level === 1) {
      totalRows = randomNum(0, 4);
      forRun.animationTime = 2;
    } else if (level === 2) {
      totalRows = randomNum(3, 7);
      forRun.animationTime = 2.5;
    } else {
      totalRows = randomNum(6, 10);
      forRun.animationTime = 3;
    }
    setForRun({ ...forRun });
    for (let i = 0; i < totalRows; i++) {
      const row: any[] = [];
      for (let j = 0; j < 4; j++) {
        row[j] = Math.random() > 0.5;
      }
      rows.push(row as ImageParamListItem);
    }
    setImageParamList(rows);
  };
  // 渲染图片数组元素
  const renderImageParamListItem = (item: ImageParamListItem, key: number): React.ReactNode => {
    return (
      <div
        key={key}
        style={{
          width: '100px',
          height: '100px',
          padding: '4px',
          textAlign: 'center',
          display: 'inline-block',
          border: '1px solid black',
        }}
      >
        {item.map((status, index) => (
          <div
            key={index}
            style={{
              display: 'inline-block',
              justifyContent: 'space-between',
              marginLeft: '2px',
              textAlign: 'center',
              width: '42px',
              height: '42px',
              backgroundImage:
                level === 1
                  ? status
                    ? `url(${personPicture})`
                    : `url(${grass})`
                  : level === 2
                  ? status
                    ? `url(${personPicture})`
                    : `url(${personWomanPicture})`
                  : status
                  ? `url(${personPicture})`
                  : `url(${personManPicture})`,
            }}
          />
        ))}
      </div>
    );
  };

  // 监听到图片数组长度和动画播放时间的变化，设置图片div移动的距离和时间
  useEffect(() => {
    if (imageParamList.length > 0) {
      setForRun({
        ...forRun,
        styleVar: {
          height: '100px',
          float: 'left',
          transition: `all ${forRun.animationTime}s linear`,
          transform: `translateX(${-1 * imageParamListItemWidth * imageParamList.length}px )`,
        },
      });
    }
  }, [forRun.animationTime, imageParamList]);

  // 弹窗接收答案
  const askUser = () => {
    let count = 0;
    imageParamList.map((items) => items.map((item) => (count += item ? 1 : 0)));
    const alertInput = window.prompt('请输入看到的白底成年女性头像数量!');
    if (alertInput !== null && Number(alertInput) === count) {
      alert('回答正确');
      forRun.buttonState = false;
    } else {
      alert(`回答错误,正确答案是 ${count}`);
      forRun.buttonState = true;
    }
    setForRun({ ...forRun });
  };

  // 监听到图片div样式发生变化，播放图片
  useEffect(() => {
    if (forRun.styleVar && forRun.styleVar.transition) {
      setForRun({ ...forRun, playState: true });
      setTimeout(() => {
        askUser();
        setForRun({ ...forRun, playState: false, styleVar: { ...defaultStyle } });
      }, forRun.animationTime * 1000 + 500);
    }
  }, [forRun.styleVar]);

  const startGame = () => {
    paddingImageParamList();
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.GameATitle}>
        <h2>Game A：数一数</h2>
        <h2>
          <b>
            点击开始，屏幕中快速通过随机数量的头像，请数出白底成年女性头像数量，然后在弹窗中输入正确答案。
          </b>
        </h2>
      </div>
      <div>
        <button
          className={`${styles.levelButton} ${styles.buttonBox}`}
          type="button"
          disabled={forRun.playState}
          onClick={startGame}
        >
          START
        </button>
      </div>
      <div>
        {/* 幕布 */}
        <div
          style={{
            width: `${layoutWidth}px`,
            margin: '20px',
            overflow: 'hidden',
            position: 'relative',
            height: '100px',
            backgroundImage: `url(${Background})`,
          }}
        >
          {/* 展示块--数组---item（每个里面9个） */}
          <div style={forRun.styleVar}>
            {imageParamList.map((item, key) => renderImageParamListItem(item, key))}
          </div>
        </div>
      </div>
      <hr />

      <Link to="/Game/TakePictures2">
        <button disabled={forRun.buttonState} className={styles.nextButton}>
          下一关
        </button>
      </Link>
    </div>
  );
};

export default CountPeople1;
