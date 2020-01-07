# Vue를 이용한 메모 플러그인 (Used Vue.js - Memo Plugin)

vue를 이용하여 메모를 할 수 있는 플러그인 입니다.<br/>You can making sticky memo using vue.js plugin.

# 사용법 (How to use it)

dist 안에 있는 sticky.js를 가져와서 Vue 플러그인에 등록합니다.<br/>
First, you import sticky.js in dist. And Then connect at Vue mother instence.<br/>
메모가 저장되는 곳은 LocalStorage 이므로 사용하시려면 서버가 돌아가고 있어야 합니다.<br/>
On save data storage is LocalStorage. So, you must using this on your running server. <br/>
스타일시트를 기본적으로 붙이시려면 default.scss로 작성한 내용이 있으므로, 그걸 바탕으로 활용하시면 됩니다.<br/>
If you want using stylesheet. You can refering \'default.scss\'.<br /><br />

# 내부 디렉티브 (Directive in this plugin)

## v-add-memo:add

클릭시 메모를 추가해 주는 버튼입니다. <br/>
Click button, add new memo in document.

## v-add-memo:remove

클릭시 메모를 삭제해 주는 버튼입니다. <br/>
Click button, remove memo in document.

## v-add-memo:modify

클릭시 메모를 수정해 주는 버튼입니다. <br/>
Click button, modify memo in document.

## v-add-memo:title

메모의 제목을 편집하는 input<br/>
This input tag linked in your memo title.

## v-add-memo:content

메모의 컨텐츠를 편집하는 textarea<br/>
This textarea tag linked in your memo content.

## v-add-memo:setindex

현재 편집할 메모의 id를 지정해주는 셀렉트박스 혹은 input<br/>
This Element is Pointing your editable memo. (input or select)

![example](https://user-images.githubusercontent.com/17559697/71885937-af01ea00-317e-11ea-8086-079d7f6bce0e.png)<br /><br />

```js
import Vue from "vue";
import StickyPlugin from "./../dist/sticky";

Vue.use(StickyPlugin.sticky, {
  name: "Sample" // this is your LocalStorage item name. (여기에다가 LocalStorage 키 이름 작성해주세요)
});

window.app = new Vue({
  el: "#app",
  // main.vue 에서 만든 내용을 render 함수에서 덧씌워서 쓰겠단 의미
  render: h => h(App),
  StickyPlugin: StickyPlugin.sticky
});
```

```js
<div id="app">
    <input type="text" v-add-memo:title />
    <textarea v-add-memo:content></textarea>
    <select v-add-memo:setindex
      >notthing</select
    >
    <button v-add-memo:add>추가</button> // add
    <button v-add-memo:remove>삭제</button> // remove
    <button v-add-memo:modify>수정</button> // modify
    <ul>
      <li
        v-for="(item, index) in memos"
        v-bind:key="item.id"
        v-bind:class="[index == activeMemo[0] ? 'active' : '']"
      >
        <strong>{{ item.title }}</strong>
        <span>{{ item.date | date }}</span>
        <div>{{ item.content }}</div>
      </li>
    </ul>
```
