import {
  loader,
  Editor as MonacoEditor,
  EditorProps as MonacoEditorProps,
  useMonaco,
} from "@monaco-editor/react";
import { memo, useEffect } from "react";
import * as monaco from "monaco-editor";
import ReactTypeDefinitionFile from "../node_modules/@types/react/index.d.ts?raw";

loader.config({ monaco });

const monacoOptions: MonacoEditorProps["options"] = {
  scrollbar: {
    alwaysConsumeMouseWheel: false,
    verticalScrollbarSize: 10,
  },
  minimap: { enabled: false },
  fontSize: 13,
};

const tscOptions = {
  allowNonTsExtensions: true,
  target: monaco.languages.typescript.ScriptTarget.ES2015,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  jsx: monaco.languages.typescript.JsxEmit.Preserve,
  typeRoots: ["node_modules/@types"],
  allowSyntheticDefaultImports: true,
};

export const Editor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = memo(({ value, onChange }) => {
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.languages.typescript.typescriptDefaults.setCompilerOptions(
      tscOptions,
    );

    console.log(ReactTypeDefinitionFile);
    monaco?.languages.typescript.typescriptDefaults.addExtraLib(
      ReactTypeDefinitionFile,
      "file:///node_modules/@types/react/index.d.ts",
    );
  }, [monaco]);

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="typescript"
      path={"index.tsx"}
      value={value}
      onChange={(value) => onChange(value ?? "")}
      options={monacoOptions}
      language="typescript"
    />
  );
});
