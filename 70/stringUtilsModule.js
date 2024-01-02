myApp.utils.stringUtilsModule = (function () {
    // public methods
    return {
        stringCaseInsensitiveEquals: function (str1, str2) {
            return str1.toLowerCase() === str2.toLowerCase();
        }
    };
})();
