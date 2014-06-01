'use strict';

var categories = [{
  id:'sports',
  name:'Sports',
  features:[
    'baseball',
    'basketball',
    'vollyball',
    'soccer',
    'football',
    'multipurpose',
    'tennis',
    'discGolf',
    'golf',
    'skatePark',
    'swimming'
  ]
},{
  id:'permitRequired',
  name:'Permit Required',
  features:[
    'camping',
    'fishing'
  ]
},{
  id:'educational',
  name:'Educational',
  features:[
    'nativeCenter',
    'historicFeatures'
  ]
},{
  id:'trails',
  name:'Trails',
  features:[
    'walking',
    'hiking',
    'horse',
    'bike'
  ]
},{
  id:'water',
  name:'Water',
  features:[
    'lake',
    'swimming',
    'sprayPark',
    'boat',
    'canoe',
    'fishing'
  ]
},{
  id:'family',
  name:'Family',
  features:[
    'communityCenter',
    'communityGarden',
    'playground',
    'picnicShelter'
  ]
},{
  id:'other',
  name:'Other',
  features:[
    'adaAccessible',
    'restrooms',
    'dogPark'
  ]
}];

function mapList(list) {
  return list.reduce(function (map, item) {
    return map[item];
  }, {});
}

categories.anyFeature = function (features) {
  var matches = [],
      featureMap = Array.isArray(features) ? mapList(features) : features || {};
  function match(feature) {
    return featureMap.hasOwnProperty(feature);
  }
  categories.filter(function (category) {
    return category.features.any(match);
  });
  return matches;
};

categories.everyFeature = function (features) {
  var matches = [],
      featureMap = Array.isArray(features) ? mapList(features) : features || {};
  function match(feature) {
    return featureMap.hasOwnProperty(feature);
  }
  categories.filter(function (category) {
    return category.features.every(match);
  });
  return matches;
};

module.exports = categories;
