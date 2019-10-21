'use strict';
let api_key = 'oCxeXoeMF91EA2m9Znq6jSuoK8ojh9hOEP7mquaM';
let url = 'https://developer.nps.gov/api/v1/parks';


function getParksByState(states, max) {
    const formatStates = states.join(',');
    const _limit = (max === undefined || max === null) ? (10) : (max);
    console.log('formatStates', formatStates);
    const params = {
        limit: _limit,
        stateCode: formatStates,
        api_key: api_key
    };
    const tgtUrl = ( url + '?' + 'limit=' + params.limit + '&stateCode=' + params.stateCode + '&api_key=' + params.api_key );

    fetch(tgtUrl)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJson => displayResults(resJson))
        .catch(e => alert(e.message));
}

function displayResults(responseJson) {
    console.log(responseJson);
    responseJson.data.map(item => {
         console.log(`name: ${item.fullName} , description: ${item.description}, url: ${item.url}`);
         $('.results-parks').append(
             `<p>name: ${item.fullName} , description: ${item.description}, url: ${item.url}<p>`
         )
    });

    //display the results section
    $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        console.log($('#select').val());
        console.log($('#limit').val());
        $('.results-parks').children().detach();
        getParksByState($('#select').val(), ($('#limit').val()));
    });
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});