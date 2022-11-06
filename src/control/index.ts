import { KeyboardEvent } from "react";
import { keyboard } from "../actions/index";
import { store } from "../store";

const keyDownHandler = (e: { code: string; }) => {
  // console.log(e);
  switch (e.code) {
    case keyboard.ArrowDown:
      store.dispatch(keyboard.moveDown());
      return;
    case keyboard.ArrowLeft:
      store.dispatch(keyboard.moveLeft());
      return;
    case keyboard.ArrowRight:
      store.dispatch(keyboard.moveRight());
      return;
    case keyboard.ArrowUp:
      store.dispatch(keyboard.rotate());
      return;
    case keyboard.Space:
      store.dispatch(keyboard.drop());
      return;
    default:
      return;
  }
};

document.addEventListener("keydown", keyDownHandler);
