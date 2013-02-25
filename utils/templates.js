var 
    fs = require('fs'),
    handlebars = require('handlebars')
;

handlebars.registerHelper("foreach",function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function(item,index) {
        item.$index = index;
        item.$notlast = !(index === arr.length-1);
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
    }).join('');
});

module.exports = {
    report : handlebars.compile(fs.readFileSync(__dirname + '/tpl/report.hbs', "utf8"))
}