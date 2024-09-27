import { use, useEffect, useState } from "react";
import { CompressedInfo } from "./CompressedInfo";
import { Editor } from "./Editor";
import { useNavigate } from "react-router-dom";
import { compressToEncodedURIComponent } from "./compression";

export const AppBody: React.FC<{
  defaultSourcePromise: Promise<string>;
}> = ({ defaultSourcePromise }) => {
  const defaultSource = use(defaultSourcePromise);

  const [source, setSource] = useState(defaultSource);
  const navigate = useNavigate();

  useEffect(() => {
    compressToEncodedURIComponent(source).then((compressed) => {
      const params = new URLSearchParams({
        source: compressed,
      });
      navigate({ search: params.toString() }, { replace: true });
    });
  }, [navigate, source]);

  return (
    <>
      <div>
        <Editor value={source} onChange={setSource} />
      </div>
      <div className="h-full overflow-auto">
        <CompressedInfo source={source} />
      </div>
    </>
  );
};
