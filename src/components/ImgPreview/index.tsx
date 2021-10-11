import { Container, UserImg } from "./styles";
import { useState, useEffect } from "react";

interface ImgPreviewProps {
  file: File;
}

function ImgPreview({ file }: ImgPreviewProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thumb, setThumb] = useState<string>("");

  useEffect(() => {
    if (!file.name) {
      return;
    }
    setIsLoading(true);
    let reader = new FileReader();
    reader.onload = () => {
      setThumb(reader.result as string);
    };
    reader.readAsDataURL(file);
    setIsLoading(false);
  }, [file]);

  return (
    <>
      {thumb !== "" && (
        <Container>
          <UserImg imgObj={thumb as string} height={200} width={200} />
        </Container>
      )}
    </>
  );
}

export default ImgPreview;
