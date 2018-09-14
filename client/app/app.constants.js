'use strict';

import angular from 'angular';

export default angular.module('liftoffApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
