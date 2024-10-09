

<h2 id="project-description">Project Description</h2>
A simple usage of useTranition in a react project. You can toggle between using useTransition or not using it and see the effect on the user experience entering text to an input field. In this project we give by using useTransition a lower priority to rendering long list which otherwise cause entering a text in an input to be slugish

<h2 id="motivation">Motivation</h2>
useTransition is React hook introduced in react 18 that defers state updates to keep the UI responsive during heavy rendering. But how to use it ? that the purpose of this project 

<h2 id="installation">Installation</h2>
Use the following to install the project packages

```bash
pnpm i
```

npm is also possible

<h2 id="usage">Usage</h2>

<h3>Invocation</h3>
Use the following to run the development server

```bash
npm run dev
```

<h3>basic usage of useTransition</h3>

```ts
  const [isPending, startTransition] = useTransition();
```

useTransition() is a React hook that returns an array with two elements.
<ul>
<li>isPending: A boolean that tells you if the transition is ongoing. If it’s true, it means the UI is currently waiting for the transition to finish</li>

<li>startTransition: A function used to wrap your state updates that should be marked as transitions. When you call this function with your updates inside it, React will handle those updates with lower priority, ensuring the UI remains responsive</li>
</ul>

<h3>Using startTransition</h3>
We define updateList as transition meaning that it will have lower priority rendering the UI which live the user higher priority for user input

```ts
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
```

<h3>Using isPending</h3>
isPending is used to show transition loading message while the longList is rendering

```ts
    <div>
      <input 
        type="text" value={input} 
        onChange={handleChange} placeholder="Type something..."
      />
      {isPending && <p>Loading...</p>}
      <div>
        <label>
          <input
            type="checkbox" checked={useTransitionToggle}
            onChange={() => setUseTransitionToggle(!useTransitionToggle)}
          />
          With useTransition
        </label>
      </div>
      <ul>
        {longList.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    </div>
```

<h2 id="code-structure">Code Structure</h2>
App is a component which uses useTransition 

<h2 id="demo">Demo</h2>
We can see here a figure of the UI of App component. You need to type into the input and see the list below rendering. Try this for yourself and you will see the following

<ul>
<li>when the check box is clicked , useTransition is used and you will see that the ui is very responsive for user inputs</li>
<li>when the check box is unclicked , useTransition is not used and you will see that the ui is very sluggish for user inputs</li>
</ul>

In particular this is evidence after you type 12345678 , mark it and erase it in one click - try for yourself

<img src='./figs/demo.png'/>

<h2 id="points-of-interest">Points of Interest</h2>
<ul>
    <li>useTransition helps in scenarios where you want to keep the UI responsive while deferring non-urgent state updates, but it won't help you handle CPU-intensive tasks directly</li>
    <li>The react 19 hook useServerAction is using internally useTransition</li>
</ul>

<h2 id="references">References</h2>
<ul>
    <li>The following is a <a href='https://react.dev/reference/react/useTransition'>link</a> from the react documnration in useTransition</li>
</ul>

