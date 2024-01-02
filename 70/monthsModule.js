myApp.utils.monthsModule = (function () {
    // private variables
    var months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    // public methods
    return {
        getMonthName: function (index) {
            if (index >= 1 && index <= 12) {
                return months[index - 1];
            } else {
                return "Invalid month index";
            }
        },

        getMonthIndex: function (name) {
            name = name.toLowerCase();
            for (var i = 0; i < months.length; i++) {
                if (months[i].toLowerCase() === name) {
                    return i + 1;
                }
            }
            return "Invalid month name";
        }
    };
})();
