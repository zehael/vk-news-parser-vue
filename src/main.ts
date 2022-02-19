import { createApp } from "vue";
import App from "./App.vue";
import { Image, Card, Empty, Button, Spin } from "ant-design-vue";

const app = createApp(App);
app.use(Image);
app.use(Card);
app.use(Empty);
app.use(Button);
app.use(Spin);
app.mount("#app");
