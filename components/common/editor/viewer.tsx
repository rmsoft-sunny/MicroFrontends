import { cn } from "@/lib/utils";
import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import EditorTheme from "./theme/theme";
import EditorNodes from "./nodes";
import "./viewer.css";

export default function Viewer({
  content,
  className,
}: {
  content: InitialEditorStateType;
  className?: string;
}) {
  try {
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      if (!(typeof parsed === "object" && parsed.hasOwnProperty("root"))) {
        content = null;
      }
    }
  } catch (error) {
    console.log("editorState를 초기화하지 못했습니다.");
    content = null;
  }

  const initialConfig: InitialConfigType = {
    namespace: "CliveWorksViewer",
    theme: EditorTheme,
    onError: (error) => {
      console.log("Editor Error!!\n", error);
    },
    nodes: [...EditorNodes],
    editorState: content,
    editable: false,
  };

  return (
    <div className={cn("h-full min-h-96 w-full bg-background", className)}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-full w-full overflow-auto p-4 focus:outline-none" />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </LexicalComposer>
    </div>
  );
}
