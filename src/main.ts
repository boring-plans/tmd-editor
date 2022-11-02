import "./style.css";
import { schema } from "prosemirror-markdown";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { buildInputRules } from "./prosemirror/inputrules";
import { buildKeymap } from "./prosemirror/keymap";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  '<div id="editor"></div>';

schema.nodes.horizontal_rule.spec.selectable = false;

const state = EditorState.create({
  schema,
  plugins: [
    buildInputRules(schema),
    history(),
    keymap(buildKeymap(schema)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
  ],
});
const editorElem = document.querySelector<HTMLElement>("#editor");
const view = new EditorView(editorElem, {
  state,
  dispatchTransaction(transaction) {
    let newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});

(editorElem?.firstChild as HTMLElement)?.focus();