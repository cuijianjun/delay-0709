import _ from 'lodash';
import './style/index.css';
import './style/a.scss';
function createDomElement() {
  let dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  dom.className = 'box';
  return dom;
}
let dom = createDomElement();
document.body.appendChild(dom);
