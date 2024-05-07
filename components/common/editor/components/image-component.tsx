"use client";

import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  BaseSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { $isImageNode } from "../nodes/image-node";
import { Loader2 } from "lucide-react";

const imageCache = new Set();

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  // maxWidth,
}: {
  altText: string;
  className: string | null;
  height: "inherit" | number;
  imageRef: { current: null | HTMLImageElement };
  // maxWidth: number;
  src: string;
  width: "inherit" | number;
}): JSX.Element {
  useSuspenseImage(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        // maxWidth,
        width,
      }}
      draggable="false"
    />
  );
}

// 이미지 컴포넌트
export default function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  // maxWidth,
}: {
  altText: string;
  height: "inherit" | number;
  // maxWidth: number;
  nodeKey: NodeKey;
  src: string;
  width: "inherit" | number;
}): JSX.Element {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const activeEditorRef = useRef<LexicalEditor | null>(null);

  // Delete
  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.remove();
          return true;
        }
      }
      return false;
    },
    [isSelected, nodeKey],
  );

  // ESC
  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (buttonRef.current === event.target) {
        $setSelection(null);
        editor.update(() => {
          setSelected(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
        return true;
      }
      return false;
    },
    [editor, setSelected],
  );

  // Click
  const onClick = useCallback(
    (payload: MouseEvent) => {
      const event = payload;

      if (isResizing) {
        return true;
      }

      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected);
        } else {
          clearSelection();
          setSelected(true);
        }
        return true;
      }
      return false;
    },
    [isResizing, isSelected, setSelected, clearSelection],
  );

  // useEffect
  useEffect(() => {
    let isMounted = true;

    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        onClick,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        onEscape,
        COMMAND_PRIORITY_LOW,
      ),
    );

    return () => {
      isMounted = false;
      unregister();
    };
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    onEscape,
    onClick,
    setSelected,
  ]);

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing;
  const isFocused = isSelected || isResizing;

  return (
    <Suspense
      fallback={
        <span style={{ width, height }} className="p-8">
          <Loader2 className="h-full w-full animate-spin" />
        </span>
      }
    >
      <div draggable={draggable}>
        <LazyImage
          className={
            isFocused
              ? `focused ${$isNodeSelection(selection) ? "draggable" : ""}`
              : null
          }
          src={src}
          altText={altText}
          imageRef={imageRef}
          width={width}
          height={height}
          // maxWidth={maxWidth}
        />
      </div>
    </Suspense>
  );
}
