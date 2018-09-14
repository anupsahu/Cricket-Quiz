import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import ques from './data';

/*@ngInject*/
export function MainController($scope) {

    this.questions = ques.ques;

    this.reset = function() {
        this.answer = [];
        this.result = false;
        $scope.form.$setUntouched();
        $scope.form.$setPristine();
    }

    this.submit = function() {
        console.log(this.answer)
        if (!$scope.form.$error.required) {
            this.correct = 0;

            this.questions.forEach((ques, index) => {
                if (ques.answer === this.answer[index])
                    this.correct++;
            });


            $scope.labels = ["Right", "Wrong"];
            $scope.data = [this.correct, (this.questions.length - this.correct)];
            this.result = true;
            console.log(this.correct);
        }

    }

}

export default angular.module('liftoffApp.main', [uiRouter])
    .controller('MainController', MainController)
    .config(routing)
    .directive("evaluate", function() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {


                ngModel.$validators.evaluate = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;

                    if (!value) {
                        return true;
                    }

                    if (value === scope.ques.answer)
                        return true;
                    else
                        return false;
                };
            }
        };
    })
    .name;