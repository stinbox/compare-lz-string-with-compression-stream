import { useState } from "react";
import { CompressedInfo } from "./CompressedInfo";
import { Editor } from "./Editor";

const defaultSource = `const data =
  \`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
🧑‍🧑‍🧒‍🧒\`;`;

function App() {
  const [source, setSource] = useState(defaultSource);

  return (
    <div className="grid grid-cols-2 divide-x">
      <Editor value={source} onChange={setSource} />
      <CompressedInfo source={source} />
    </div>
  );
}

export default App;
