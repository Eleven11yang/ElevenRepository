import { useState } from 'react';
const Practice = () => {
  const addIndex = -1;
  const [messages, setMessages] = useState<{ id: number; title: string; info: string }[]>([
    { id: 1, title: 'AAA', info: 'aaaaaaaaaaaaaaaaa' },
    { id: 2, title: 'BBB', info: 'bbbbbbbbbbbbbb' },
  ]);
  const [editing, setEditing] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>();

  const showDetailedMessage = (messageIndex: number) => {
    setCurrentMessageIndex(messageIndex);
  };
  const editMessage = () => {
    setEditing(false);
  };
  const closeEdit = () => {
    setEditing(true);
    setCurrentMessageIndex(undefined);
  };
  const saveEdit = () => {
    const newValueTitle = (document.getElementById('editMessageTitle') as HTMLInputElement).value;
    const newValueInfo = (document.getElementById('editMessageInfo') as HTMLInputElement).value;
    const values = { title: newValueTitle, info: newValueInfo };
    if (currentMessageIndex === addIndex) {
      messages.push({ ...values, id: messages.length });
    } else {
      // 输入框的当前值赋给currentMessageIndex对应的对象
      // messages[currentMessageIndex!].title = newValueTitle;
      // messages[currentMessageIndex!].info = newValueInfo;
      messages[currentMessageIndex!] = { ...values, id: messages[currentMessageIndex!].id };
    }
    setMessages([...messages]);
    closeEdit();
  };
  const cancelEdit = () => {
    setEditing(true);
    closeEdit();
  };
  const deleteEdit = (messageIndex: number) => {
    messages.splice(messageIndex, 1);
    setMessages([...messages]);
    console.log('messages[]:', messages);
  };
  return (
    <div>
      <h1>Practice</h1>
      <ol>
        {/* messages.filter((_, messageIndex) => messageIndex < messages.length) 划分数组*/}
        {messages.map((message, messageIndex) => (
          <li key={message.id}>
            <h1 onClick={() => showDetailedMessage(messageIndex)}>{message.title}</h1>
            <button onClick={() => deleteEdit(messageIndex)}>Delete</button>
          </li>
        ))}
      </ol>
      <button onClick={() => setCurrentMessageIndex(addIndex)}>Create</button>

      <hr />

      {currentMessageIndex !== undefined &&
        (editing && messages[currentMessageIndex] !== undefined ? (
          <>
            {messages[currentMessageIndex].title}
            {messages[currentMessageIndex].info}
            <button onClick={editMessage}>edit</button>
            <button onClick={closeEdit}>close</button>
          </>
        ) : (
          <>
            <input
              type="text"
              id="editMessageTitle"
              defaultValue={messages[currentMessageIndex]?.title}
            />
            <input
              type="text"
              id="editMessageInfo"
              defaultValue={messages[currentMessageIndex]?.info}
            />
            <button onClick={saveEdit}>save</button>
            <button onClick={cancelEdit}>cancel</button>
          </>
        ))}
    </div>
  );
};
export default Practice;
