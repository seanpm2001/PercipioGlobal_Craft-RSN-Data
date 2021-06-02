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
    if ($('.map-js').length) {
        initMap();
    }
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
    if (document.getElementById('chart-engagementCompletion')) {
        var ctx = document.getElementById('chart-engagementCompletion').getContext('2d');
        var count = $(ctx.canvas).data('count'),
            totalCount = $(ctx.canvas).data('total-count');
        var chart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['Data Entry Completion'],
                datasets: [
                    {
                        data: [count],
                        label: 'Engagement data complete (%) ',
                        backgroundColor: 'rgb(16, 185, 129)',
                        borderColor: 'rgb(16, 185, 129)',
                    }, {
                        data: [totalCount],
                        label: 'Engagement data incomplete (%) ',
                        backgroundColor: 'rgb(190, 24, 93)',
                        borderColor: 'rgb(190, 24, 93)',
                    }
                ]
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
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: false
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
                        }
                    ],
                    yAxes: [
                        {
                            maxBarThickness: 64,
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
                        }
                    ]
                },
            }
        });
    }

    // Engagement Level
    if (document.getElementById('chart-engagementLevel')) {
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
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: false
                            },
                            stacked: true
                        }
                    ],
                    yAxes: [
                        {
                            maxBarThickness: 64,
                            gridLines: {
                                display: false,
                                zeroLineWidth: 0,
                                zeroLineColor: "#fff"
                            },
                            ticks: {
                                display: false
                            },
                            stacked: true
                        }
                    ]
                },
            }
        });
    }

    // Follow on Support
    if (document.getElementById('chart-followOnSupport')) {
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
                datasets: [
                    {
                        backgroundColor: 'rgb(251, 146, 60)',
                        borderColor: 'rgb(251, 146, 60)',
                        data: values,
                        fill: false
                    }
                ]
            },

            // Configuration options go here
            options: {
                tooltips: defaultTooltips,
                layout: defaultLayout,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [
                        {
                            barPercentage: 0.9,
                            categoryPercentage: 0.9,
                            ticks: {
                                beginAtZero: true
                            },
                        }
                    ],
                    xAxes: [
                        {

                            scaleLabel: {
                                display: false
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                }
            }
        });
    } // endif

};

// Initialize and add the map
var markers = [];

function initMap() {

    // The location of RSN
    var mapContainer = $('#engagementMap'),
        json = JSON.parse(mapContainer.attr('data-markers'));
    console.log(json);


    var map = new google.maps.Map(document.getElementById('engagementMap'), {
        zoom: 6,
        center: new google.maps.LatLng(53, -1.7),
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
        // weed out non location / manual entries
        if (data.latitude > 0) {

            // Creating a marker and putting it on the map
            var IsPriority = "No";
            if (data.priority == '1') {
                IsPriority = "Yes";
            }

            var marker = new google.maps.Marker({
                map: map,
                phase: data.phase,
                position: latLng,
                postcode: data.postcode,
                priority: IsPriority,
                region: data.region,
                street: data.street,
                town: data.town,
                title: data.schName,
                type: data.type,
                urn: data.urn,
            });


            var contentString = '<h4 class="text-lg leading-tight mb-2"><b>' + marker.title + '</b></h4>' +
                '<p class="mb-1">Address: <b>' + marker.street + ', ' + marker.town + ', ' + marker.postcode + '</b></p>' +
                '<p class="mb-1">Region: <b>' + marker.region + '</b></p>' +
                '<p class="mb-1">Priority School: <b>' + marker.priority + '</b></p>' +
                '<p class="mb-1">Type: <b>' + marker.type + '</b></p>' +
                '<p class="mb-1">Phase: <b>' + marker.phase + '</b></p>' +
                '<p class="mb-1">URN: <b><a href="https://www.compare-school-performance.service.gov.uk/school/' + marker.urn + '/" style="color: #E12D39" target="_blank">' + marker.urn + '</a></b></p>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 360,
            });

            google.maps.event.addListener(marker, 'click', (function(marker, contentString, infowindow) {
                return function() {
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                };
            })(marker, contentString, infowindow));

            markers.push(marker);

        }  // end if no location data
    }

    function AutoCenter() {
        var bounds = new google.maps.LatLngBounds();
        $.each(markers, function(index, marker) {
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds, 0)
    }

    AutoCenter();


}


rsnInit();