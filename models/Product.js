/**
 * Created by Bartek on 13.09.2015.
 */

module.exports = function Product(name, weightInGrams, calorificValuePerGram) {

    var name = name;
    var weightInGrams = weightInGrams;
    var calorificValuePerGram = calorificValuePerGram;

    this.getCalorificValue = function () {
        return weightInGrams * calorificValuePerGram;
    };

    this.getName = function () {
        return name;
    };

};