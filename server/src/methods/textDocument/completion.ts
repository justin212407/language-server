import { RequestMessage } from "../../server";
import { documents, TextDocumentIdentifier } from "../../documents";
import log from "../../log";
import * as fs from "fs";

const words = fs.readFileSync("/usr/share/dict/words").toString().split("\n");
const items = words.map((word) => {
  return { label: word };
});

type CompletionItem = {
  label: string;
};

interface Position {
  line: number;
  character: number;
}

interface TextDocumentPositionParams {
  textDocument: TextDocumentIdentifier;
  position: Position;
}

export interface CompletionList {
  isIncomplete: boolean;
  items: CompletionItem[];
}

export interface CompletionParams extends TextDocumentPositionParams {}

export const completion = (message: RequestMessage): CompletionList => {
  const params = message.params as CompletionParams;
  const content = documents.get(params.textDocument.uri);

  log.write({ completion: content });

  return {
    isIncomplete: false,
    items
  };
};
