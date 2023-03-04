import DraftEditor from "./components/Editor";
import "./App.css";
function App() {
  const initialText = '{"blocks":[{"key":"item1","text":"Hello, world!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

  const handleSave = (content) => {
    console.log(content);
  };

  return <DraftEditor initialText={initialText} onSave={handleSave} />;
}

export default App;
