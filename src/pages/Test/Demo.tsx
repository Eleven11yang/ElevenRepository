import { useState } from 'react';

const Demo = () => {
  const [List, setList] = useState<{ id: number; title: string; details: string }[]>([
    { id: 1, title: 'AA', details: 'aaaaaaaaaa' },
    { id: 2, title: 'BB', details: 'bbbbbbbbbb' },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const showDetailedList = (listIndex: number) => {
    setCurrentIndex(listIndex);
  };
  const create = () => {
    setCurrentIndex(-1);
  };
  const closeEditing = () => {
    setEditing(false);
    setCurrentIndex(undefined);
  };
  const saveEdited = () => {
    const inputTitle = (document.getElementById('inputTitle') as HTMLInputElement).value;
    const inputDetails = (document.getElementById('inputDetails') as HTMLInputElement).value;
    const object = { title: inputTitle, details: inputDetails };
    if (currentIndex === -1) {
      List.push({ ...object, id: List.length });
    } else {
      List[currentIndex!] = { ...object, id: List[currentIndex!].id };
    }
    setList([...List]);
    closeEditing();
  };

  const cancelEditing = () => {
    closeEditing();
  };
  const deleteElement = (listIndex: number) => {
    List.splice(listIndex, 1);
    setList([...List]);
    closeEditing();
  };
  return (
    <>
      <h1>Demo</h1>
      <ol>
        {List.map((listItem, listIndex) => (
          <li key={listItem.id}>
            <h1 onClick={() => showDetailedList(listIndex)}>{listItem.title}</h1>
            <button onClick={() => deleteElement(listIndex)}>delete</button>
          </li>
        ))}
      </ol>
      <button onClick={create}>create</button>
      <hr />
      {currentIndex !== undefined &&
        (!editing && List[currentIndex] !== undefined ? (
          <>
            {List[currentIndex!].title}
            <br />
            {List[currentIndex!].details}
            <button onClick={() => setEditing(true)}>edit</button>
            <button onClick={closeEditing}>closeEditing</button>
          </>
        ) : (
          <>
            <input type="text" id="inputTitle" defaultValue={List[currentIndex]?.title} />
            <br />
            <input type="text" id="inputDetails" defaultValue={List[currentIndex]?.details} />
            <button onClick={saveEdited}>save</button>
            <button onClick={cancelEditing}>cancelEditing</button>
          </>
        ))}
    </>
  );
};
export default Demo;
