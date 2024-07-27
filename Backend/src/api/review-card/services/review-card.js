'use strict';

/**
 * review-card service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::review-card.review-card');
