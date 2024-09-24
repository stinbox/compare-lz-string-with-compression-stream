import "./App.css";
import { Editor, EditorProps } from "@monaco-editor/react";

const monacoOptions: EditorProps["options"] = {
  scrollbar: {
    alwaysConsumeMouseWheel: false,
    verticalScrollbarSize: 10,
  },
  minimap: { enabled: false },
  fontSize: 13,
};

function App() {
  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="typescript"
        path={"index.js"}
        defaultValue="// some comment"
        options={monacoOptions}
        language="typescript"
      />
    </div>
  );
}

export default App;
