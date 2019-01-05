// 定义链表类
function LinkList() {
  // 定义节点
  var Node = function (data) {
    this.data = data;
    this.next = null;
  }
  this.length = 0;
  var head = null;
  var tail = null;

  // 在尾部添加一个节点
  this.append = function (data) {
    // 创建新节点
    var new_node = new Node(data);
    if (!head) {
      head = new_node;
      tail = new_node;
    } else {
      tail.next = new_node;
      tail = new_node;
    }
    this.length +=1;
    return true;
  }

  // 打印数据
  this.print = function () {
    var curr_node = head;
    while(curr_node) {
      console.log(curr_node.data);
      curr_node = curr_node.next;
    }
  }

  // 插入任意位置
  this.insert = function (index, data) {
    if (index < 0 || index > length) {
      return false;
    } else if (index == length) {
      return this.append(data);
    } else {
      var new_node = new Node(data);
      // new_node成为新的头节点
      if (index == 0) {
        new_node.next = head;
        head = new_node;
      } else {
        var insert_index = 1;
        var current_node = head;
        while (insert_index < index) {
          insert_index +=1;
          current_node = current_node.next;
        }
        // 当循环结束
        var next_node = current_node.next;
        current_node.next = new_node;
        new_node.next = new_node;
      }
      length +=1;
      return true;
    }
  }

  // 删除任意节点
  this.remove = function (index) {
    if (index < 0 || index > length) {
      return false;
    } else {
      var del_node = null;
      if (index == 0) {
        del_node = head;
        head = head.next;
      } else {
        var del_index = 0;
        var pre_node = null;
        var curr_node = head;
        while (del_index < index) {
          del_index += 1;
          pre_node = curr_node;
          curr_node = curr_node.next;
        }
        del_node = curr_node;
        pre_node.next = curr_node.next;

        // 如果被删除的节点是为节点
        if (curr_node.next == null) {
          tail = pre_node;
        }
        length -=1;
        del_node.next = null;
        return del_node.next;
      }
    }
  }
}

var link = new LinkList();
link.append(2);
link.append(4);
link.append(8);
console.log(link.length);
link.print();
