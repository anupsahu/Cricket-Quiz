import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import ques from './data';

/*@ngInject*/
export function MainController($scope) {

    this.questions = ques.ques;

    this.reset = function() {

        //reset models
        this.answer = [];
        this.result = false;

        //reset forms
        $scope.form.$setUntouched();
        $scope.form.$setPristine();
    }

    this.submit = function() {

        if (!$scope.form.$error.required) {
            this.correct = 0;

            //Calculate result
            this.questions.forEach((ques, index) => {
                if (ques.answer === this.answer[index])
                    this.correct++;
            });

            //Map Configuration
            $scope.labels = ["Right", "Wrong"];
            $scope.data = [this.correct, (this.questions.length - this.correct)];

            //Show Result Pie Chart
            this.result = true;

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

                //Custom Validators to check answers
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