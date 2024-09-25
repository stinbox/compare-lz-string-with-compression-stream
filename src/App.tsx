import { useCallback } from "react";
import { CompressedInfo } from "./CompressedInfo";
import { Editor } from "./Editor";
import { useSearchParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";

const defaultSource = `const data =
  \`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
🧑‍🧑‍🧒‍🧒\`;`;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const source = searchParams.get("source") ?? defaultSource;
  const setSource = useCallback(
    (source: string) => {
      setSearchParams({ source }, { replace: true });
    },
    [setSearchParams],
  );

  return (
    <div className="grid grid-cols-2 divide-x min-w-[1200px] h-dvh grid-rows-[auto_1fr]">
      <header className="px-4 py-2 col-span-2 border-b-2 flex items-center">
        <h1 className="text-xl font-bold mr-auto">
          LZString vs CompressionStream
        </h1>
        <a
          href="https://github.com/stinbox/compare-lz-string-with-compression-stream"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-grid place-items-center size-11 hover:bg-slate-500/20 rounded-xl transition-colors"
        >
          <FaGithub className="size-7" />
        </a>
      </header>
      <div>
        <Editor value={source} onChange={setSource} />
      </div>
      <div className="h-full overflow-auto">
        <CompressedInfo source={source} />
      </div>
    </div>
  );
}

export default App;
