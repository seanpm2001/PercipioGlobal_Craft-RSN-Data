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


$('.js-select').change(function() {
    var selectData = $(this),
        selectId = selectData.find('select').attr('id');
    selectedText = selectData.find('option:selected').text();
    $('[' + selectId + ']').text(selectedText);
    rsnInit();
});

var chartBuilder = function() {

    var ctx = document.getElementById('chart-line').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
            datasets: [{
                label: 'Engaged',
                backgroundColor: 'rgb(220, 38, 38)',
                borderColor: 'rgb(220, 38, 38)',
                data: [25, 45, 201, 223, 275, 51, 79, 90, 230, 340, 375, 196],
                fill: false
            }, {
                label: 'Sustained',
                backgroundColor: 'rgb(249, 115, 22)',
                borderColor: 'rgb(249, 115, 22)',
                data: [20, 44, 180, 171, 104, 40, 20, 46, 17, 41, 81, 90],
                fill: false
            }, {
                label: 'Embedded',
                backgroundColor: 'rgb(6, 182, 212)',
                borderColor: 'rgb(6, 182, 212)',
                data: [11, 17, 27, 45, 80, 44, 18, 9, 41, 57, 59, 40],
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    top: 24,
                    bottom: 24
                }
            }
        }
    });


    var ctx = document.getElementById('chart-totals').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',
        // The data for our dataset
        data: {
            labels: ['All schools', 'Priority schools'],
            datasets: [{
                label: 'Engaged',
                backgroundColor: 'rgb(220, 38, 38)',
                borderColor: 'rgb(220, 38, 38)',
                data: [302, 45],
                fill: false
            }, {
                label: 'Sustained',
                backgroundColor: 'rgb(249, 115, 22)',
                borderColor: 'rgb(249, 115, 22)',
                data: [245, 44],
                fill: false
            }, {
                label: 'Embedded',
                backgroundColor: 'rgb(6, 182, 212)',
                borderColor: 'rgb(6, 182, 212)',
                data: [76, 17],
                fill: false
            }]
        },

        // Configuration options go here
        options: {
        scales: {
            yAxes: [{
                barThickness: 12,  // number (pixels) or 'flex'
                maxBarThickness: 12 // number (pixels)
            }]
        },
            responsive: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    top: 24,
                    bottom: 24
                }
            }
        }
    });

};


// Initialize and add the map
function initMap() {

    // The location of RSN
    var mapContainer = $('#engagementMap'),
    schoolLat = parseFloat(mapContainer.attr('data-lat')),
    schoolLng = parseFloat(mapContainer.attr('data-lng')),
    school = mapContainer.attr('data-school');

    const rs = {
        lat: schoolLat,
        lng: schoolLng
    };

    var jsonData = {
  "data": [
    {
      "status": "1",
      "school": "Adel Beck",
      "schooldata": "133058",
      "postcode": "LS1 1UR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Allerton High School",
      "schooldata": "108057",
      "postcode": "LS17 7AG",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Baildon CofE Primary School",
      "schooldata": "107337",
      "postcode": "BD17 6TE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Beckfoot Nessfield",
      "schooldata": "146281",
      "postcode": "BD22 6NP",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Beckfoot Thornton",
      "schooldata": "143114",
      "postcode": "BD13 3BH",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Brigshaw High School",
      "schooldata": "143238",
      "postcode": "WF10 2HR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Carrwood Primary School",
      "schooldata": "107240",
      "postcode": "BD4 0EQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Co-op Academy Parkland",
      "schooldata": "145752",
      "postcode": "BD10 9BG",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Crawshaw Academy",
      "schooldata": "138304",
      "postcode": "LS28 9HU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Cottingley Academy",
      "schooldata": "146198",
      "postcode": "BD16 1TZ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Manningham Academy",
      "schooldata": "141375",
      "postcode": "BD8 8HY",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Trinity Chapeltown",
      "schooldata": "144743",
      "postcode": "LS7 4AW",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Unity Academy",
      "schooldata": "146363",
      "postcode": "LS12 3DS",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "High Crags Primary Leadership Academy",
      "schooldata": "142582",
      "postcode": "BD18 2ES",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Jaamiatul Imaam Muhammad Zakaria",
      "schooldata": "107460",
      "postcode": "BD14 6JX",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Knowleswood Primary School",
      "schooldata": "132183",
      "postcode": "BD4 9AE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Leeds East Academy",
      "schooldata": "136826",
      "postcode": "LS14 6TY",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Leeds West Academy",
      "schooldata": "135935",
      "postcode": "LS13 1DQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Lister Primary",
      "schooldata": "147939",
      "postcode": "BD9 5AT",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Myrtle Park Primary",
      "schooldata": "107437",
      "postcode": "BD16 1HB",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Oasis Academy Lister Park",
      "schooldata": "139995",
      "postcode": "BD8 7ND",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Rastrick High School",
      "schooldata": "137444",
      "postcode": "HD6 3XB",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Ryecroft Primary Academy",
      "schooldata": "138675",
      "postcode": "BD4 0LS",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Shipley CofE Primary School",
      "schooldata": "146536",
      "postcode": "BD18 2PT",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Shirley Manor Primary School",
      "schooldata": "140639",
      "postcode": "BD12 8SA",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Southmere Primary Academy",
      "schooldata": "146798",
      "postcode": "BD7 3NR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Anthony's Catholic Primary School, Beeston",
      "schooldata": "108021",
      "postcode": "LS11 7JS",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Francis Catholic Primary School, A Voluntary Academy",
      "schooldata": "147922",
      "postcode": "BD2 4ES",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St John Fisher Catholic High School",
      "schooldata": "121717",
      "postcode": "HG2 8PT",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Joseph's Catholic Primary School, A Voluntary Academy",
      "schooldata": "147924",
      "postcode": "BD16 4HQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Matthew's Catholic Primary School",
      "schooldata": "107336",
      "postcode": "BD15 7NE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Matthew's Catholic Primary School",
      "schooldata": "132793",
      "postcode": "L4 8UA",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Swain House Primary School",
      "schooldata": "107220",
      "postcode": "BD2 1JL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Tong Leadership Academy",
      "schooldata": "142761",
      "postcode": "BD4 6NR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Trinity Academy, Halifax",
      "schooldata": "136094",
      "postcode": "HX2 9TZ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Westminster Church of England Primary Academy",
      "schooldata": "142824",
      "postcode": "BD3 0HW",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Woodkirk Academy",
      "schooldata": "137383",
      "postcode": "WF3 1JQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "All Saints' CofE Primary School",
      "schooldata": "107309",
      "postcode": "LS29 9BE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Appleton Academy",
      "schooldata": "145173",
      "postcode": "BD12 8AL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Barkerend Primary Leadership Academy",
      "schooldata": "142836",
      "postcode": "BD3 0QT",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Beckfoot School",
      "schooldata": "139975",
      "postcode": "BD16 1EE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Belle Vue Girls' Academy",
      "schooldata": "138087",
      "postcode": "BD9 6NA",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Ben Rhydding Primary School",
      "schooldata": "107281",
      "postcode": "LS29 8QH",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Bowling Park Primary School",
      "schooldata": "107234",
      "postcode": "BD5 8BT",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Brackenhill Primary School",
      "schooldata": "107250",
      "postcode": "BD7 4HA",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Bradford Academy",
      "schooldata": "135367",
      "postcode": "BD4 7QJ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Bradford Alternative Provision Academy Central",
      "schooldata": "146851",
      "postcode": "BD18 3JE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Bradford Forster Academy",
      "schooldata": "140429",
      "postcode": "BD4 8RG",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Burley and Woodhead CofE Primary School",
      "schooldata": "107313",
      "postcode": "LS29 7RQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Byron Primary School",
      "schooldata": "144050",
      "postcode": "BD3 0AB",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Calverley Parkside Primary School",
      "schooldata": "146540",
      "postcode": "LS28 5PQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Carlton Bolling",
      "schooldata": "147100",
      "postcode": "BD3 0DU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Cavendish Primary School",
      "schooldata": "107243",
      "postcode": "BD2 2DU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Clayton Village Primary School",
      "schooldata": "107199",
      "postcode": "BD14 6AD",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Crossflatts Primary School",
      "schooldata": "107253",
      "postcode": "BD16 2EP",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Crossley Hall Primary School",
      "schooldata": "146581",
      "postcode": "BD8 0HJ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Cullingworth Village Primary School",
      "schooldata": "146049",
      "postcode": "BD13 5DA",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Denholme Primary School",
      "schooldata": "143567",
      "postcode": "BD13 4AY",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Allerton Academy",
      "schooldata": "135866",
      "postcode": "BD8 0DH",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons City Academy",
      "schooldata": "130909",
      "postcode": "BD5 7RR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Free Sixth Form",
      "schooldata": "143704",
      "postcode": "BD5 7JR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Marchbank Primary",
      "schooldata": "140358",
      "postcode": "BD3 8QQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons McMillan Academy",
      "schooldata": "141002",
      "postcode": "BD5 0JD",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Music Primary",
      "schooldata": "138252",
      "postcode": "BD5 0BE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Trinity Academy",
      "schooldata": "138251",
      "postcode": "BD5 0BE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Eastwood Community School",
      "schooldata": "146223",
      "postcode": "BD21 3JL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Eldwick Primary School",
      "schooldata": "107255",
      "postcode": "BD16 3LE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Farfield Primary and Nursery School",
      "schooldata": "107238",
      "postcode": "BD6 2BS",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Farnham Primary School",
      "schooldata": "144862",
      "postcode": "BD7 3HU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Frizinghall Primary School",
      "schooldata": "107204",
      "postcode": "BD9 4HP",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Glenaire Primary School",
      "schooldata": "107280",
      "postcode": "BD17 7LY",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Hartshead Junior and Infant School",
      "schooldata": "107667",
      "postcode": "WF15 8AW",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Holybrook Primary School",
      "schooldata": "145303",
      "postcode": "BD10 0EF",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Ilkley Grammar School",
      "schooldata": "136905",
      "postcode": "LS29 8TR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Iqra Primary School",
      "schooldata": "135614",
      "postcode": "SW4 9PA",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Keighley St Andrew's CofE Primary School and Nursery",
      "schooldata": "107339",
      "postcode": "BD21 2ND",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Killinghall Primary School",
      "schooldata": "107431",
      "postcode": "BD3 7JF",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Lapage Primary School and Nursery",
      "schooldata": "143564",
      "postcode": "BD3 8QX",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Lees Primary School",
      "schooldata": "142950",
      "postcode": "BD22 9DL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Ley Top Primary School",
      "schooldata": "107241",
      "postcode": "BD15 7PQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Lidget Green Primary School",
      "schooldata": "107212",
      "postcode": "BD7 2QN",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Lilycroft Nursery School",
      "schooldata": "107187",
      "postcode": "BD9 5AD",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Lower Fields Primary Academy",
      "schooldata": "146584",
      "postcode": "BD4 8RG",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Merlin Top Primary Academy",
      "schooldata": "139229",
      "postcode": "BD22 6HZ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Newby Primary School",
      "schooldata": "107218",
      "postcode": "BD5 7DQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Outwood Grange Academy",
      "schooldata": "135961",
      "postcode": "WF1 2PF",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Parkside Primary School",
      "schooldata": "103081",
      "postcode": "E4 6RE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Parkwood Primary School",
      "schooldata": "143569",
      "postcode": "BD21 4QH",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Peel Park Primary School and Nursery",
      "schooldata": "101494",
      "postcode": "BD2 4PR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Poplars Farm Primary School",
      "schooldata": "107247",
      "postcode": "BD2 1LQ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Rossington All Saints Academy",
      "schooldata": "136675",
      "postcode": "DN11 0BZ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Saltaire Primary School",
      "schooldata": "107270",
      "postcode": "BD18 4NR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Sandal Primary School",
      "schooldata": "107287",
      "postcode": "BD17 5DH",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Anne's Catholic Primary School",
      "schooldata": "141062",
      "postcode": "BD21 3AD",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Edmund's Nursery School & Children's Centre",
      "schooldata": "107190",
      "postcode": "BD8 9QW",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Mary's Catholic Primary School",
      "schooldata": "107546",
      "postcode": "HX1 2ER",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St. Mary's Menston, a Catholic Voluntary Academy",
      "schooldata": "139351",
      "postcode": "LS29 6AE",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Stocks Lane Primary School",
      "schooldata": "107237",
      "postcode": "BD13 2RH",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "The Academy At St. James",
      "schooldata": "143847",
      "postcode": "BD15 7YD",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Thornbury Primary Leadership Academy",
      "schooldata": "145936",
      "postcode": "BD3 7AU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "University Academy Keighley",
      "schooldata": "136198",
      "postcode": "BD20 6EB",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Victoria Primary School",
      "schooldata": "143571",
      "postcode": "BD21 2RD",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Whetley Academy",
      "schooldata": "139046",
      "postcode": "BD8 9HZ",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "All Saints Church of England Primary School",
      "schooldata": "107302",
      "postcode": "BD5 0NG",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Beckfoot Allerton Primary School and Nursery",
      "schooldata": "143092",
      "postcode": "BD15 7HB",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Beckfoot Heaton Primary",
      "schooldata": "143094",
      "postcode": "BD9 6LL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Beckfoot Oakbank",
      "schooldata": "143112",
      "postcode": "BD22 7DU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Beckfoot Upper Heaton",
      "schooldata": "142031",
      "postcode": "BD9 6AL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Capella House School",
      "schooldata": "147188",
      "postcode": "TW2 7SL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Dixons Kings Academy",
      "schooldata": "137277",
      "postcode": "BD7 2AN",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Girlington Primary School",
      "schooldata": "107293",
      "postcode": "BD8 9NR",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Holycroft Primary School",
      "schooldata": "143982",
      "postcode": "BD21 1JF",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Laycock Primary School",
      "schooldata": "144861",
      "postcode": "BD22 0PP",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Long Lee Primary School",
      "schooldata": "107265",
      "postcode": "BD21 4RU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Miriam Lord Community Primary School",
      "schooldata": "107296",
      "postcode": "BD8 8RG",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Our Lady of Victories Catholic School",
      "schooldata": "141059",
      "postcode": "BD22 6JP",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Clare's Catholic Primary School",
      "schooldata": "107325",
      "postcode": "BD2 3JD",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Philip's CofE Primary School",
      "schooldata": "141098",
      "postcode": "BD8 9JL",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Stephen's CofE Primary School",
      "schooldata": "107323",
      "postcode": "BD5 7HU",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St. Mary's & St. Peter's Catholic Primary School",
      "schooldata": "107329",
      "postcode": "BD3 9ND",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "The Halifax Academy",
      "schooldata": "140326",
      "postcode": "HX2 0BA",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "Marshfield Primary School",
      "schooldata": "107215",
      "postcode": "BD5 9DS",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "1",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Joseph's Catholic Primary School",
      "schooldata": "107327",
      "postcode": "BD5 0RB",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St William's Catholic Primary School",
      "schooldata": "107330",
      "postcode": "BD8 9RG",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "2",
      "optin": ""
    },
    {
      "status": "1",
      "school": "St Columba's Catholic Primary School",
      "schooldata": "107326",
      "postcode": "BD4 9PY",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    },
    {
      "status": "1",
      "school": "The Holy Family Catholic School",
      "schooldata": "107428",
      "postcode": "BD20 6LH",
      "name": "",
      "email": "",
      "role": "",
      "attendance": "3",
      "optin": ""
    }
  ]
}

        var locations = jsonData.data;
       // console.log(locations);

        var map = new google.maps.Map(document.getElementById('engagementMap'), {
            zoom: 9,
            center: rs,
            scrollwheel: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            mapTypeControl: false
        });

        var infowindow = new google.maps.InfoWindow();
        var geocoder = new google.maps.Geocoder();
        var bounds = new google.maps.LatLngBounds();
        var marker, i;


       // console.log(locations.length);
        var limit = 10;
        for (i = 0; i < locations.length; i++) {
            codeAddress(locations[i]);
        }

        function codeAddress(location) {

            geocoder.geocode({
                'address': location.postcode
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        title: location[2],
                        url: locations[3],
                        position: results[0].geometry.location
                    });

                  //  console.log( marker);
                    bounds.extend(marker.getPosition());
                    map.fitBounds(bounds);

                    google.maps.event.addListener(marker, 'click', (function (marker, location) {
                        return function () {
                            infowindow.setContent(location.school);
                            infowindow.open(map, marker);
                        };
                    })(marker, location));
                } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    setTimeout(function() {
                        codeAddress(location);
                    }, 200);
                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });
        }
}

rsnInit();