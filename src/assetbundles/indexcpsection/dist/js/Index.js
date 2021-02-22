/**
 * RSN Data plugin for Craft CMS
 *
 * Index Field JS
 *
 * @author    Percipio
 * @copyright Copyright (c) 2020 Percipio
 * @link      https://percipio.london
 * @package   RsnData
 * @since     1.0.0
 */


var rsnInit = function() {
    if ($('.chart-js').length) {
        chartBuilder();
    }
    // if ($('.map-js').length) {
    //     initMap();
    // }
}

var timeset = $('#time-btn').data('time');
$('[data-time-set]').text(timeset);

var schoolsset = $('#schools-btn').data('school');
$('[data-schools-set]').text(schoolsset);

// reusable chart data options
function optionsEngaged($count) {
  return {
    data: [$count],
    label: 'Engaged (1 Day)',
    backgroundColor: 'rgb(220, 38, 38)',
    borderColor: 'rgb(220, 38, 38)'
  };
}
function optionsSustained($count) {
  return {
    data: [$count],
    label: 'Sustained (2 Days)',
    backgroundColor: 'rgb(249, 115, 22)',
    borderColor: 'rgb(249, 115, 22)',
  };
}
function optionsEmbedded($count) {
  return {
    data: [$count],
    label: 'Embedded (3+ Days)',
    backgroundColor: 'rgb(6, 182, 212)',
    borderColor: 'rgb(6, 182, 212)',
  };
}

var defaultLayout = {
    padding: {
      top: 0,
      bottom: 24
    },
}

var defaultTooltips = {
  backgroundColor: '#33404d',
  yPadding: 10,
	xPadding: 10,
  callbacks: {
      labelTextColor: function(tooltipItem, chart) {
          return '#e5e7eb';
      }
  }
}

var chartBuilder = function() {

  // Completion level
  var ctx = document.getElementById('chart-engagementCompletion').getContext('2d');
    var count = $(ctx.canvas).data('count'),
        totalCount = $(ctx.canvas).data('total-count');
      var chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['Data Entry Completion'],
            datasets: [{
              data: [count],
              label: 'Engagement data complete (%) ',
              backgroundColor: 'rgb(16, 185, 129)',
              borderColor: 'rgb(16, 185, 129)',
            },
            {
              data: [totalCount],
              label: 'Engagement data incomplete (%) ',
              backgroundColor: 'rgb(190, 24, 93)',
              borderColor: 'rgb(190, 24, 93)',
            }]
        },
        options: {
          tooltips: defaultTooltips,
          layout: {
            padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend:{ display: false },
          scales: {
              xAxes: [{
                  scaleLabel:{
                      display:false
                  },
                  gridLines: {
                    display: false,
                    zeroLineWidth: 0,
                    zeroLineColor: "#f3f7fc",
                    drawBorder: false
                  },
                  ticks: {
                    display: false
                  },
                  stacked: true
              }],
              yAxes: [{
                  maxBarThickness: 64,
                  gridLines: {
                      display:false,
                      zeroLineWidth: 0,
                      zeroLineColor: "#f3f7fc",
                      drawBorder: false
                  },
                  ticks: {
                    display: false
                  },
                  stacked: true
              }]
            },
          }
      });

  // Engagement Level
  var ctx = document.getElementById('chart-engagementLevel').getContext('2d');
    var chart = new Chart(ctx, {

        type: 'horizontalBar',
        data: {
            labels: ['Engagement Level'],
            datasets: [
              optionsEngaged($(ctx.canvas).data('engaged')),
              optionsSustained($(ctx.canvas).data('sustained')),
              optionsEmbedded($(ctx.canvas).data('embedded')),
            ]
        },
        options: {
          tooltips: defaultTooltips,
          layout: defaultLayout,
          responsive: true,
          maintainAspectRatio: false,
          legend:{ display: true },
          scales: {
              xAxes: [{
                  scaleLabel:{
                      display:false
                  },
                  stacked: true
              }],
              yAxes: [{
                  maxBarThickness: 64,
                  gridLines: {
                      display:false,
                      zeroLineWidth: 0,
                      zeroLineColor: "#fff"
                  },
                  ticks: {
                    display: false
                  },
                  stacked: true
              }]
            },
          }
      });

    // Follow on Support
    var ctx = document.getElementById('chart-followOnSupport').getContext('2d');
    var values = $(ctx.canvas).data('values').split('|');
    var labels = $(ctx.canvas).data('labels').split('|');
    // console.log(labels);
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgb(251, 146, 60)',
                borderColor: 'rgb(251, 146, 60)',
                data: values,
                fill: false
            }]
        },

        // Configuration options go here
        options: {
          tooltips: defaultTooltips,
          layout: defaultLayout,
          responsive: true,
          maintainAspectRatio: false,
          legend:{ display: false },
          scales: {
            yAxes: [{
              barPercentage: 0.9,
              categoryPercentage: 0.9,
                ticks: {
                    beginAtZero: true
                },
            }],
            xAxes: [{

              scaleLabel:{
                  display:false
              },
              ticks: {
                beginAtZero: true
            }
          }],
        }
        }
    });

};




// Initialize and add the map
function initMap() {

    // The location of RSN
    var mapContainer = $('#engagementMap'),
        json = JSON.parse(mapContainer.attr('data-markers'));
        // console.log(json);
        var map = new google.maps.Map(document.getElementById('engagementMap'), {
            zoom: 7,
            center: new google.maps.LatLng(53,-1.7),
            scrollwheel: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            mapTypeControl: false
        });

        var bounds = new google.maps.LatLngBounds();

        // Looping through the JSON data
        for (var i = 0, length = json.length; i < length; i++) {
          var data = json[i],
            latLng = new google.maps.LatLng(data.latitude, data.longitude);
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: data.urn
            });
            
            (function(marker, data) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
              infoWindow.setContent(data.urn);
              infoWindow.open(map, marker);
            });


          })(marker, data);

        }


      }


rsnInit();