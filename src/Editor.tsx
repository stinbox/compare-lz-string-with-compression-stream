import {
  Editor as MonacoEditor,
  EditorProps as MonacoEditorProps,
} from "@monaco-editor/react";
import { memo } from "react";

const monacoOptions: MonacoEditorProps["options"] = {
  scrollbar: {
    alwaysConsumeMouseWheel: false,
    verticalScrollbarSize: 10,
  },
  minimap: { enabled: false },
  fontSize: 13,
  padding: { top: 8, bottom: 8 },
  renderValidationDecorations: "off",
};

export const Editor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = memo(({ value, onChange }) => {
  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="typescript"
      path={"index.tsx"}
      value={value}
      onChange={(value) => onChange(value ?? "")}
      options={monacoOptions}
      language="typescript"
    />
  );
});
