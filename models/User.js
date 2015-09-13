/**
 * Created by Bartek on 12.09.2015.
 */

module.exports = function User(resUsername, resPassword, resEmail) {

    var username = resUsername;
    var password = resPassword;
    var email = resEmail;

    this.getUsername = function () {
        return username;
    };

    this.getPassword = function () {
        return password;
    };

    this.getEmail = function () {
        return email;
    };

};