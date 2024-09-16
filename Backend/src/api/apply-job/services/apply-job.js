'use strict';

/**
 * apply-job service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::apply-job.apply-job');
