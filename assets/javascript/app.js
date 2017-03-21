//VARIABLES
//===================================
var apiKey = "2c24b581b73c4223ad99a961cfaad9db";

//Search Parameters
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

var queryUrlBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

//variable to track number of articles
var articleCounter = 0;





// FUNCTIONS
//===================================

function runQuery(numArticles, queryURL) {
    //AJAX carousel-control
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(NYTData) {

            $('#wellSection').empty();
            for (var i = 0; i < numArticles; i++) {



                //Create html

                var wellSection = $('<div>');
                wellSection.addClass("well");
                wellSection.attr('id', 'articleWell-' + i);
                $('#wellSection').append(wellSection);
                console.log(wellSection);


                //check for data existence
                if (NYTData.response.docs[i].headline.main != 'null') {
                    console.log(NYTData.response.docs[i].headline.main);
                    $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                }
                if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                    console.log(NYTData.response.docs[i].byline.original);
                    $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
                }

                // attach the content to the appropiate wellSection

                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");

                $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");

                console.log(NYTData.response.docs[i].section_name);
                console.log(NYTData.response.docs[i].pub_date);
                console.log(NYTData.response.docs[i].web_url);



            }



            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);

        });

}

// MAIN PROCESSES
//===================================
$('#searchButton').on('click', function() {
    // Get value of search
    queryTerm = $('#search').val().trim();


    // Add in the newURL
    var newUrl = queryUrlBase + "&q=" + queryTerm;


    // Add in the number of records
    numResults = $('#numRecords').val();

    // get the start year and end year
    startYear = $('#startYear').val().trim();
    endYear = $("#endYear").val().trim();

    if (parseInt(startYear)) {
        //adds necessary fields
        startYear = startYear + '0101';
        //add date information to the newURL
        newUrl = newUrl + '&begin_date=' + startYear;
    }
    if (parseInt(endYear)) {
        //adds necessary fields
        endYear = endYear + '0101';
        //add date information to the newUrl
        newUrl = newUrl + '&end_date=' + endYear;

    }


    //send the AJAX call the new URL
    runQuery(numResults, newUrl);
    return false;
});
