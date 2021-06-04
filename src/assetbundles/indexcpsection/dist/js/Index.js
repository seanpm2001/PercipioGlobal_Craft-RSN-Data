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
var heatmapdata = [];
const gradient = [
    "rgba(220, 38, 38, 0)",
    "rgba(220, 38, 38, 1)",
    "rgba(249, 115, 2, 1)",
    "rgba(6, 182, 212, 1)",
];

function initMap() {

    // The location of RSN
    var mapContainer = $('#engagementMap'),
        iconBase = $('#engagementMap').attr('data-iconbase'),
        json = JSON.parse(mapContainer.attr('data-markers')),
        form = $('#rsn-data-map'),
        fieldLevel = $('#map-level'),
        fieldPriority = $('#map-priority'),
        fieldHeat = $('#map-heat-field').find('.lightswitch'),
        showSchools = 0;
    showLevels = 0;

    //  console.log(json);

    fieldLevel.on('change', function() {
        showLevels = this.value;
    });

    fieldPriority.on('change', function() {
        showSchools = this.value;
    });

    form.change(function(e) {

        // console.log(showSchools);
        if (fieldHeat.hasClass('on')) {
            toggleHeatmap(true);
            toggleMarkers(false);
        } else {
            toggleHeatmap(false);
            toggleMarkers(true);
        }

        toggleMarkers(showLevels, showSchools);

    });

    var icons = {
        engaged: {
            icon: iconBase + 'marker-red'
        },
        sustained: {
            icon: iconBase + 'marker-highOrange.png'
        },
        embedded: {
            icon: iconBase + 'marker-blueAlt.png'
        }
    };


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

            if (data.daysAttended == 1) {
                iconFile = iconBase + 'marker-red.png';
                level = 'Engaged';
            }
            if (data.daysAttended == 2) {
                iconFile = iconBase + 'marker-highOrange.png';
                level = 'Sustained';
            }
            if (data.daysAttended > 2) {
                iconFile = iconBase + 'marker-blueAlt.png';
                level = 'Embedded';
            }

            var icon = {
                url: iconFile,
                scaledSize: new google.maps.Size(30, 45),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(15, 45)
            };

            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                engagement: data.daysAttended,
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
                rsn: data.rsn,
                la: data.la,
                pup: data.pup,
                ppPerc: data.ppPerc,
                visible: true
            });


            var contentString = '<h4 class="text-lg leading-tight mb-2"><b>' + marker.title + '</b></h4>' +
                '<p class="mb-1">Address: <b>' + marker.street + ', ' + marker.town + ', ' + marker.postcode + '</b></p>' +
                '<p class="mb-1">Local Authority: <b>' + marker.la + '</b></p>' +
                '<p class="mb-1">Region: <b>' + marker.region + '</b></p>' +
                '<hr class="my-2">' +
                '<p class="mb-1">Total Pupils: <b>' + marker.pup + '</b></p>' +
                '<p class="mb-1">Pupil Premium: <b>' + marker.ppPerc + '%</b></p>' +
                '<hr class="my-2">' +
                '<p class="mb-1">URN: <b><a href="https://www.compare-school-performance.service.gov.uk/school/' + marker.urn + '/" style="color: #E12D39" target="_blank">' + marker.urn + '</a></b></p>' +
                '<p class="mb-1">Phase: <b>' + marker.phase + '</b></p>' +
                '<p class="mb-1">Type: <b>' + marker.type + '</b></p>' +
                '<p class="mb-1">Priority School: <b>' + marker.priority + '</b></p>' +
                '<hr class="my-2">' +
                '<p class="mb-1">Training with: <b>' + marker.rsn + '</b></p>' +
                '<p class="mb-1">Engagement Level: <b>' + level + ' (' + marker.engagement + ')</b></p>';


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

            heatmapdata.push({
                location: latLng,
                weight: marker.engagement,
            });

            markers.push(marker);

        }  // end if no location data
    }

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapdata,
        radius: 0.1,
        gradient: gradient,
        dissipating: false
    });

    function AutoCenter() {
        var bounds = new google.maps.LatLngBounds();
        $.each(markers, function(index, marker) {
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds, 0)
    }

    AutoCenter();

    function toggleHeatmap(opt) {
        heatmap.setMap(opt ? map : null)
    }

    function toggleMarkers(showLevels, showSchools) {

        console.log(showLevels);
        $.each(markers, function(index, marker) {
            markers[index].setVisible(true);
            //  markers[index].setVisible(false);
            var level = marker['engagement'],
                priority = marker['priority'];

            if (showSchools == 0) {
                markers[index].setVisible(true);
            }

            if (showSchools == 1 && priority != 'Yes') {
                markers[index].setVisible(false);
            }

            if (showSchools == 2 && priority != 'No') {
                markers[index].setVisible(false);
            }

            if (showLevels == 1 && level != 1) {
                markers[index].setVisible(false);
            } else if (showLevels == 2 && level != 2) {
                markers[index].setVisible(false);
            } else if (showLevels == 3 && level < 3) {
                markers[index].setVisible(false);
            }

            if(showSchools == 3){
                markers[index].setVisible(false);
            }

        });

    }


}


rsnInit();