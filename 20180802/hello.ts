function test(template,name,age) {
    console.log(template);
    console.log(name);
    console.log(age);
}
var myname = 'zhai liang';

var getAge = function () {
    return 18;
}

test`hello my name id ${myname}, i'm ${getAge()}`