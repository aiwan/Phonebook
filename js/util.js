/**
 * Created by User on 22-Dec-15.
 */
    //Immediately invoked function: They can be used to guard against unintended effects of hoisting:

var util = {};

(function(util) {

    function getCurrentDate () {
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var output = ((''+day).length<2 ? '0' : '') + day + '/' +
            ((''+month).length<1 ? '0' : '') + month + '/' +
            d.getFullYear();

        return output;
    }
    util.getCurrentDate = getCurrentDate;

}(util));





