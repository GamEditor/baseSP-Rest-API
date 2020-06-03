/* get site users information */

function getCurrentUserId() { return _spPageContextInfo.userId; }
function getSimpleLoginName() { return _spPageContextInfo.userLoginName; }

function getFullLoginName(onSuccess, onError) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/getuserbyid(' + _spPageContextInfo.userId + ')',
        method: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose' },
        success: function (data) { onSuccess(data.d.LoginName); },
        error: function (data) { onError(data); }
    });
}

function getCurrentUserName(onSuccess, onError) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/getuserbyid(' + _spPageContextInfo.userId + ')',
        method: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose' },
        success: function (data) { onSuccess(data.d.Title); },
        error: function (data) { onError(data); }
    });
}

function getUserName(userId, onSuccess, onError) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/getuserbyid(' + userId + ')',
        method: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose' },
        success: function (data) { onSuccess(data.d.Title); },
        error: function (data) { onError(data); }
    });
}

function getAllSiteUsers(onSuccess, onError) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/siteusers',
        method: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose' },
        success: function (data) { onSuccess(data.d.results); },
        error: function (data) { onError(data); }
    });
}