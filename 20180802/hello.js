var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function test(template, name, age) {
    console.log(template);
    console.log(name);
    console.log(age);
}
var myname = 'zhai liang';
var getAge = function () {
    return 18;
};
test(__makeTemplateObject(["hello my name id ", ", i'm ", ""], ["hello my name id ", ", i'm ", ""]), myname, getAge());
