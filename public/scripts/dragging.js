function allowDrop(ev)
{
ev.preventDefault();
}

function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);
}

function copy(ev)
{
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
console.log("DATA: " + data);
ev.target.insertBefore(document.getElementById(data).cloneNode(true), ev.target.firstChild);
$.post('/goal/addnail', {goal_id:ev.target.id});
var number_p = $(".numberofnail, #"+ev.target.id+"counter")[0];
number_p.innerHTML(number_p.innerHTML++);
}
