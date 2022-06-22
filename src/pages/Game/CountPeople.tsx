import { useEffect, useState } from 'react';
// 展示的图片数组中每个小方块设置为布尔型
type ImageParamListItem = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
];

const CountPeople: React.FC = () => {
  const layoutWidth = 1200;
  const imageParamListItemWidth = 100;
  const [imageParamList, setImageParamList] = useState<ImageParamListItem[]>([]);
  const [playState, setPlayState] = useState(false);
  const animationTime = 5;

  /* 
  定义参数舞台宽度(layoutWidth)为1200px;
  定义参数图片数组中每个元素的宽度(imageParamListItemWidth)为100px;
  定义变量imageParamList初始状态为空数组，类型为ImageParamListItem[];
  定义动画展示状态(playState)初始状态为false；
  定义动画运行时间为3s;
*/

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
        }}
      >
        {item.map((status, index) => (
          <div
            key={`${key}.${index}`}
            style={{
              display: 'inline-block',
              justifyContent: 'space-between',
              marginLeft: '2px',
              textAlign: 'center',
              width: '26px',
              height: '26px',
              background: status ? 'black' : 'white',
            }}
          />
        ))}
      </div>
    );
  };

  // 重置图片数组（展示随机数量的图片，每个图片的黑块个数随机）
  const resetImageParamList = () => {
    const totalRows = Math.ceil(Math.random() * 4 + 1);
    const rows: ImageParamListItem[] = [];

    for (let i = 0; i < totalRows; i++) {
      const row: any[] = [];
      for (let j = 0; j < 9; j++) {
        row[j] = Math.random() > 0.5;
      }
      rows.push(row as ImageParamListItem);
    }
    setImageParamList(rows);
  };

  const askUser = () => {
    let count = 0;
    imageParamList.map((items) => items.map((item) => (count += item ? 1 : 0)));
    const alertInput = window.prompt('请输入看到的黑色方块数量!');
    if (alertInput !== null && Number(alertInput) === count) {
      alert('回答正确');
    } else {
      alert(`回答错误,正确答案是 ${count}`);
    }
  };

  // 定义图片div的默认样式
  const defaultStyle = {
    height: '100px',
    transform: `translateX(${layoutWidth}px)`,
  };
  const [styleVar, setStyleVar] = useState<Record<string, string>>({ ...defaultStyle });

  // 运行动画，更改动画状态，向用户询问结果，并回到初始状态
  const play = () => {
    setPlayState(true);
    setTimeout(() => {
      askUser();
      setPlayState(false);
      setStyleVar({ ...defaultStyle });
    }, animationTime * 1000 + 500);
  };

  // 监听到图片数组长度发生变化，设置图片div移动的距离和时间
  useEffect(() => {
    if (imageParamList.length > 0) {
      setStyleVar({
        height: '100px',
        transition: `all ${animationTime}s linear`,
        transform: `translateX(${-1 * imageParamListItemWidth * imageParamList.length}px )`,
      });
    }
  }, [imageParamList]);

  // 监听到图片div移动的距离和时间，运行动画play
  useEffect(() => {
    if (styleVar && styleVar.transition) {
      play();
    }
  }, [styleVar]);

  const startGame = () => {
    resetImageParamList();
  };

  return (
    <>
      <div>
        <h2>Game A：数一数</h2>
        <h3>
          点击开始，屏幕中快速通过随机数量的黑色方块，请数出黑色方块数量，然后在弹窗中输入正确答案。
        </h3>
      </div>
      <div>
        {/* 幕布 */}
        <div
          style={{
            width: `${layoutWidth}px`,
            margin: 'auto',
            overflow: 'hidden',
            position: 'relative',
            height: '100px',
            background: 'lightBlue',
          }}
        >
          {/* 展示块--数组---item（每个里面9个） */}
          <div style={styleVar}>
            {imageParamList.map((item, key) => renderImageParamListItem(item, key))}
          </div>
        </div>
      </div>
      <div>
        <button type="button" disabled={playState} onClick={startGame}>
          START
        </button>
      </div>
    </>
  );
};

export default CountPeople;
