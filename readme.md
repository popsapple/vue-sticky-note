# Vue를 이용한 메모 플러그인 (Used Vue.js - Memo Plugin)

vue를 이용하여 메모를 할 수 있는 플러그인 입니다.<br/>You can making sticky memo using vue.js plugin.

# 사용법 (How to use it)

dist 안에 있는 sticky.js를 가져와서 Vue 플러그인에 등록합니다.<br/>
First, you import sticky.js in dist. And Then connect at Vue mother instence.<br/>
메모가 저장되는 곳은 localStorage 이므로 사용하시려면 서버가 돌아가고 있어야 합니다.<br/>
On save data storage is LocalStorage. So, you must using this on your running server. <br/>
스타일시트를 기본적으로 붙이시려면 default.scss로 작성한 내용이 있으므로, 그걸 바탕으로 활용하시면 됩니다.<br/>
If you want using stylesheet. You can refering \'default.scss\'.

```js
import Vue from "vue";
import StickyPlugin from "./../dist/sticky";

Vue.use(StickyPlugin.sticky, {
  name: "Sample"
});

window.app = new Vue({
  el: "#app",
  // main.vue 에서 만든 내용을 render 함수에서 덧씌워서 쓰겠단 의미
  render: h => h(App),
  StickyPlugin: StickyPlugin.sticky
});
```
