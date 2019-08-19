class compile{
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.vm = vm;

    // 编译
    if (this.$el) {
      // 转换内部内容为片段Fragment
      this.$fragment = this.node2Fragment(this.$el);
      // 执行编译
      this.compile(this.$fragment);
      // 将编译完的html结果追加至$el
      this.$el.appendChild(this.$fragment);
    }
  }

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if () {}
    })
  }
  // 将宿主元素中代码片段拿出来遍历，这样做比较高效
  node2Fragment(el) {
    const frag = document.createDocumentFragment();
    // 将el中所有子元素搬家至frag中
    let child;
    while ((child = el.firstChild)) {
      frag.appendChild(child);
    }
    return frag;
  }

  isElement() {
    return node.nodeType === 1;
  }

  isInterPolation(node) {
    return node.nodeType === 3 && /\{\{.*\}\}/.test(node.textContent);
  }


}
