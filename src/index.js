import "./styles.css";
import App from './app';
import { InitialBooksData } from "./constants";

const app = new App({
  initialBooks: InitialBooksData
})

document.getElementById("app").innerHTML = app.render()
app.attachEvents()
