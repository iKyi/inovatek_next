import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";

export type MarkdownParserPropsType = {
  children: string;
  trimContent?: number;
};

const MarkdownParser: React.FC<MarkdownParserPropsType> = ({
  children,
  trimContent,
}) => {
  // *************** RENDER *************** //

  const content = useMemo(() => {
    if (!trimContent) {
      return children;
    }
    let trimmedContent = children.substring(0, trimContent);

    if (trimmedContent.length < children.length) {
      trimmedContent = trimmedContent + " ....";
    }

    return trimmedContent;
  }, [trimContent, children]);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      skipHtml={trimContent ? true : false}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownParser;
