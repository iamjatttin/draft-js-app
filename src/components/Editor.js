import React, { useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentBlock, Entity, RichUtils, getDefaultKeyBinding, Modifier, EditorBlock, BlockMap } from "draft-js";
import { Map, List } from "immutable"; // Add this line
import "draft-js/dist/Draft.css";
import { extraSpacePlugin } from "../plugins/draftPlugin";
import "../../src/App.css";
const SPACE_ENTITY_TYPE = "__S__";
const DraftEditor = ({ initialText, onSave }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(initialText))));
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    onSave(content);
    setEditing(false);
  };

  React.useEffect(() => {
    if (!editorState) return;
    // console.log(editorState);
  }, [editorState]);
  function createSpaceEntity() {
    return new ContentBlock({
      type: SPACE_ENTITY_TYPE,
      text: " ",
    }).getEntityAt(0);
  }
  function SpaceEntity(props) {
    return <span className="SpaceEntity">{props.children}</span>;
  }

  function blockRendererFn(contentBlock) {
    const text = contentBlock.getText();
    if (text.indexOf("  ") !== -1) {
      const entities = [];
      let start = 0;
      let end = 0;
      while ((end = text.indexOf("  ", start)) !== -1) {
        if (end > start) {
          const entityKey = Entity.create("SPACE", "IMMUTABLE", {});
          entities.push({
            entity: entityKey,
            offset: start,
            length: end - start,
          });
        }
        start = end + 2;
      }
      if (start < text.length) {
        const entityKey = Entity.create("SPACE", "IMMUTABLE", {});
        entities.push({
          entity: entityKey,
          offset: start,
          length: text.length - start,
        });
      }
      const blocks = entities.map(({ entity, offset, length }) => ({
        key: `${contentBlock.getKey()}:${offset}:${length}`,
        type: "unstyled",
        text: " ",
        data: { entity },
      }));
      const newBlockMap = new Map([...editorState.getCurrentContent().getBlockMap(), ...blocks.map((block) => [block.key, new ContentBlock(block)])]); // Change this line
      const blockKeys = List(blocks.map((block) => block.key));
      return {
        component: ({ contentState, block }) => <EditorBlock contentState={contentState} block={block} />,
        editable: true,
        props: {
          blockProps: { blockKeys },
        },
      };
    }
    return null;
  }

  return (
    <div>
      {editing ? (
        <div className="editor">
          <Editor editorState={editorState} onChange={setEditorState} placeholder="Write something..." />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="content" onClick={() => setEditing(true)}>
          <div
            dangerouslySetInnerHTML={{
              __html: editorState
                .getCurrentContent()
                .getBlocksAsArray()
                .map((block) => block.getText())
                .join("<br>"),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DraftEditor;
