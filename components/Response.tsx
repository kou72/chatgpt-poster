// import MarkdownPreview from "../components/MarkdownPreview";
import ReactMarkdown from 'react-markdown'
import { useChatGPT } from '../hooks/useChatGPT'

export const Response = () => {
  const { output } = useChatGPT()
  return (
    <div className="markdown-body h-full overflow-y-auto">
      {/* <MarkdownPreview>{output}</MarkdownPreview> */}
      <ReactMarkdown>{output}</ReactMarkdown>
    </div>
  )
}
