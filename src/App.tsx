import { useState } from "react";
import { CompressedInfo } from "./CompressedInfo";
import { Editor } from "./Editor";

function App() {
  const [source, setSource] = useState(
    "// some comment\nconst a = 1;\nconst b = 2;\nconsole.log(a + b);",
  );

  return (
    <div className="grid grid-cols-2 divide-x">
      <Editor value={source} onChange={setSource} />
      <CompressedInfo source={source} />
    </div>
  );
}

export default App;
