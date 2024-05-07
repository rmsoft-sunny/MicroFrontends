import { Klass, LexicalNode } from "lexical";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ImageNode } from "./image-node";

const EditorNodes: Array<Klass<LexicalNode>> = [
  ImageNode,
  LinkNode,
  AutoLinkNode,
];

export default EditorNodes;
