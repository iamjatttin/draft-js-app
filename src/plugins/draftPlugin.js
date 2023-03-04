import React from "react";
import { EditorState, Modifier,ContentBlock } from "draft-js";

const SPACE_ENTITY_TYPE = "__S__";


const lineSpacingPlugin = {
  handleReturn: (editorState, event) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // Get the block and block type at the current selection
    const block = contentState.getBlockForKey(selection.getStartKey());
    const blockType = block.getType();

    // If the block type is not a code block, insert a line break
    if (blockType !== "code-block") {
      const newContentState = Modifier.insertText(contentState, selection, "\n");
      const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
      return "handled";
    }

    return "not-handled";
  },
};

const extraSpacePlugin = {
  handleBeforeInput: (editorState, char) => {
    if (char === " ") {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();

      const block = contentState.getBlockForKey(selection.getStartKey());
      const text = block.getText();
      const spaceIndex = selection.getStartOffset();

      // Insert space entity for each space character
      if (spaceIndex > 0 && text.charAt(spaceIndex - 1) === " ") {
        const newContentState = contentState.createEntity(SPACE_ENTITY_TYPE, "MUTABLE", {});
        const spaceEntityKey = newContentState.getLastCreatedEntityKey();
        const newContentStateWithSpace = Modifier.insertText(newContentState, selection, " ", null, spaceEntityKey);
        const newEditorState = EditorState.push(editorState, newContentStateWithSpace, "insert-characters");
        return "handled";
      }
    }
    return "not-handled";
  },

  handlePastedText: (text, html, editorState) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const textLength = text.length;
    let modifiedText = "";

    // Replace all spaces with &nbsp;
    for (let i = 0; i < textLength; i++) {
      const char = text.charAt(i);
      if (char === " " || char === `&nbsp` || char === `&nbsp;`) {
        console.log("space");
        modifiedText += `&nbsp`; // &nbsp;
      } else {
        console.log("not space");

        modifiedText += char;
      }
    }

    const newContentState = Modifier.insertText(contentState, selection, modifiedText);
    const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
    return "handled";
  },
};

const lineBreakPlugin = {
  handleReturn: (editorState, event) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const block = contentState.getBlockForKey(selection.getStartKey());
    const blockType = block.getType();
    if (blockType === "CodeBlock") {
      return "not-handled";
    }

    if (event.shiftKey) {
      const newContentState = Modifier.insertText(contentState, selection, "\n");
      const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
      return "handled";
    }

    if (block.getLength() === 0) {
      const newContentState = Modifier.setBlockType(contentState, selection, "unstyled");
      const newEditorState = EditorState.push(editorState, newContentState, "change-block-type");
      return "handled";
    }

    return "not-handled";
  },
};

export { extraSpacePlugin, lineBreakPlugin, lineSpacingPlugin };
