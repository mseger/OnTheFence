function allowDrop(ev)
{
ev.preventDefault();
}

function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
ev.target.appendChild(document.getElementById(data));
}

function copy(ev)
{
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
ev.target.insertBefore(document.getElementById(data).cloneNode(true), ev.target.firstChild.nextSibling.nextSibling);
$.post('/fence/nails', {goal_id:ev.target.id});
}
