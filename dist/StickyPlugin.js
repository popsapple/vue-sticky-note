class StickyPlugin {
  constructor(Vue, dataStore) {
    this.memo = dataStore.memo;
    this.name = dataStore.name;
    this.Vue = Vue;
    this.pointer = dataStore.pointer;
    this.addDirective();
    this.titleInput;
    this.selectInput;
    this.contentInput;
  }
  filterIndexMemo(id) {
    // 새로 추가시 at add new memo search primery key(?)
    if (this.findMemo("id", id) != -1) {
      filterIndexMemo(id++);
    } else {
      return id;
    }
  }
  findMemo(key, val) {
    // 메모 찾기 search memo
    return this.memo.findIndex(ele => {
      return ele[key] === val;
    });
  }
  addMemo(new_memo) {
    // 빈 메모 추가 add memo
    this.memo.push(new_memo);
    this.selectedMemo = this.memo.length - 1;
    this.updateSelectBox(this.selectedMemo);
    localStorage.setItem(this.name, JSON.stringify(this.memo));
  }
  removeMemo(id) {
    // 메모 삭제 remove memo
    this.memo.splice(this.findMemo("id", id), 1);
    this.memo.forEach(function(ele, idx) {
      if (ele.id > id) {
        ele.id -= 1;
      }
    });
    this.selectedMemo = 0;
    this.updateSelectBox(this.selectedMemo);
    localStorage.setItem(this.name, JSON.stringify(this.memo));
  }
  modifyMemo(memo) {
    // 메모 수정 modify memo
    let idx = this.findMemo("id", memo.id);
    if (idx != -1) {
      let item = this.memo[idx];
      item.title = memo.title;
      item.content = memo.content;
    }
    localStorage.setItem(this.name, JSON.stringify(this.memo));
  }
  get innerMemo() {
    return [...this.memo];
  }
  set insertMemo(contents) {
    this.addMemo(this.tempMemo(contents.title, contents.content));
  }
  changeMemo(idx) {
    this.selectedMemo = idx;
  }
  set selectedMemo(idx) {
    // 현재 편집중인 메모 지정 now editing memo pointer(?)
    this.updateSelectBox();
    this.setContents(parseInt(idx));
    this.pointer.unshift(parseInt(idx));
    this.pointer.splice(0, -1);
  }
  get selectedMemo() {
    // 현재 편집중인 메모 가져오기 now editing memo pointer(?)
    return this.pointer[0];
  }
  tempMemo(title, content) {
    // empty memo
    return {
      title: title == undefined ? "" : title,
      content: content == undefined ? "" : content,
      date: new Date(),
      id: this.filterIndexMemo(this.memo.length)
    };
  }
  clearContents() {
    this.titleInput.value = "";
    this.contentInput.value = "";
  }
  setContents(idx) {
    this.titleInput.value = this.memo[idx].title;
    this.contentInput.value = this.memo[idx].content;
    this.selectInput.value = idx;
  }
  updateSelectBox(idx) {
    if (this.selectInput.tagName.toUpperCase() == "SELECT") {
      this.selectInput.querySelectorAll("option").forEach((ele, idx) => {
        this.selectInput.removeChild(ele);
      });
      this.innerMemo.map((ele, idx) => {
        var opt = document.createElement("option");
        opt.setAttribute("text", idx);
        opt.setAttribute("value", idx);
        opt.textContent = idx;
        this.selectInput.appendChild(opt);
      });
    }
    if (idx !== undefined) {
      this.setContents(idx);
    }
  }
  addDirective() {
    var self = this;
    this.Vue.directive("add-memo", {
      bind(el, binding, vnode, oldVnode) {
        switch (
          binding.arg //v-add-memo:**
        ) {
          case "title":
            self.titleInput = el;
            el.addEventListener("textChange", function() {
              if (el.tagName.toUpperCase() == "INPUT") {
                var memo = {
                  ...self.innerMemo[self.findMemo("id", self.selectedMemo)],
                  date: new Date(),
                  title: el.value,
                  content: self.contentInput.value
                };
                self.modifyMemo(memo);
              } else {
                new Error("you just have title in input tag");
              }
            });
            break;
          case "content":
            self.contentInput = el;
            el.addEventListener("textChange", function() {
              if (el.tagName.toUpperCase() == "TEXTAREA") {
                var memo = {
                  ...self.innerMemo[self.findMemo[self.selectedMemo]],
                  date: new Date(),
                  content: el.value
                };
                self.modifyMemo(memo);
              } else {
                new Error("you just have content in textarea tag");
              }
            });
            break;
          case "modify":
            el.addEventListener("click", function() {
              var event = new Event("textChange");
              self.contentInput.dispatchEvent(event);
              self.titleInput.dispatchEvent(event);
            });
            break;
          case "setindex":
            self.selectInput = el;
            el.addEventListener("change", function() {
              if (
                el.tagName.toUpperCase() == "SELECT" ||
                el.tagName.toUpperCase() == "INPUT"
              ) {
                self.changeMemo(parseInt(el.value));
              } else {
                new Error("you just have content in selectbox tag");
              }
            });
            self.updateSelectBox(0);
            break;
          case "add":
            el.addEventListener("click", function() {
              if (el.tagName.toUpperCase() == "BUTTON") {
                self.insertMemo = {
                  title: self.titleInput.value,
                  content: self.contentInput.value
                };
              } else {
                new Error("you just have content in button tag");
              }
            });
            break;
          case "remove":
            el.addEventListener("click", function() {
              if (el.tagName.toUpperCase() == "BUTTON") {
                if (self.findMemo("id", self.selectedMemo) != -1) {
                  self.removeMemo(
                    self.innerMemo[self.findMemo("id", self.selectedMemo)].id
                  );
                } else {
                  new Error("Are you remove nothing Element?");
                }
              } else {
                new Error("you just have content in button tag");
              }
            });
            break;
          default:
            break;
        }
      }
    });
  }
  loadData() {
    localStorage.getItem(this.name)
      ? (this.memo = JSON.parse(localStorage.getItem(this.name)))
      : "";
  }
}

export default {
  install(Vue, options) {
    let dataStore = new Vue({
      data: { memo: [], pointer: [0], name: options.name }
    });
    Vue.prototype.$StickyPlugin = new StickyPlugin(Vue, dataStore);
    Vue.prototype.$StickyPlugin.addDirective();
    Vue.prototype.$StickyPlugin.loadData();
    Vue.filter("date", function(value) {
      return value.toISOString
        ? value.toISOString().slice(0, value.toISOString().indexOf("T"))
        : value.slice(0, value.indexOf("T"));
    });
  }
};
