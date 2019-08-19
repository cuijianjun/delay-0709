

class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data);
  }

  observe(value) {
    if (!value || typeof value !=='object') {
      return;
    }
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key]);
    })
  }

  defineReactive(obj, key, value) {
    this.observe(value);
    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set (newValue) {
        if (newValue === value) {
          return value;
        }
        value = newValue;
        console.log(`${key}属性更新了，新值 ${value}`);
      }
    })
  }
}


// dep 用来管理watcher

class Dep{
  constructor() {
    // 存放依赖 （watcher）
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
