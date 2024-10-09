import "./App.css";
import { useState, useTransition, ChangeEvent } from "react";

const ITEM_IN_LONG_LIST = 20000;

function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState<string>("");
  const [longList, setLongList] = useState<string[]>([]);
  const [useTransitionToggle, setUseTransitionToggle] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const updateList = () => {
      const newList = Array.from(
        { length: ITEM_IN_LONG_LIST },
        (_, index) => `${value} ${index}`
      );
      setLongList(newList);
    };

    if (useTransitionToggle) {
      startTransition(updateList);
    } else {
      updateList();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type something..."
      />
      {isPending && <p>Loading...</p>}
      <div>
        <label>
          <input
            type="checkbox"
            checked={useTransitionToggle}
            onChange={() => setUseTransitionToggle(!useTransitionToggle)}
          />
          With useTransition
        </label>
      </div>
      <ul>
        {longList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
