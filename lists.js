/* list operations with rest api */

function getListItemById(listTitle, itemId, select, onSuccess, onError, async) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")" + (select.trim() != '' ? ('?$select=' + select) : ''),
        async: async ? async : true,
        method: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose' },
        success: function (data) { onSuccess(data.d); },
        error: function (data) { onError(data); }
    });
}

function getListItemsByFilter(listTitle, select, filter, top, orderby, onSuccess, onError, async) {
    var slc = select.trim() != '' ? ('$select=' + select) : '';
    var flt = filter.trim() != '' ? ('&$filter=' + filter) : '';
    var tp = top.trim() != '' ? ('&$top=' + top) : '';
    var ord = orderby.trim() != '' ? ('&$orderby=' + orderby) : ''; // example: Employee asc  or  Employee desc
    var f = slc + flt + tp + ord;

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items" + (f != '' ? ('?' + f) : ''),
        async: async ? async : true,
        method: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose' },
        success: function (data) { onSuccess(data.d.results); },
        error: function (data) { onError(data); }
    });
}

function getItemTypeForListName(listName) {
    return "SP.Data." + listName.charAt(0).toUpperCase() + listName.slice(1) + "ListItem";
}

function createListItem(listTitle, newdata, onSuccess, onError, async) {
    // sample of new data

    // var newdata = {
    //     __metadata: {
    //          // also for getting 'type' you can use getItemTypeForListName(listName)
    //         'type': 'SP.Data.[ListName]ListItem', // [ListName] is for list name (first char must be capital)
    //     },
    //     Title: 'title',
    //     x: 45 + '',  // don't forget to convert numbers to string for text columns (it may cause 400 error)
    //     y: 90,
    // };

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('" + listTitle + "')/items",
        type: "POST",
        async: async ? async : true,
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(newdata),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) { onSuccess(data); },
        error: function (data) { onError(data); }
    });
}

function updateListItemById(listTitle, itemId, newdata, onSuccess, onError, async) {
    // var newdata = {
    //     __metadata: {
    //         'type': 'SP.Data.[ListName]ListItem', // [ListName] is for list name (first char must be capital)
    //     },
    //     Title: "new title",
    //     x: 'x',
    //     y: 65 + '',  // don't forget to convert numbers to string for text columns (it may cause 400 error)
    // };
    $.ajax({
        type: 'POST',
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")",
        async: async ? async : true,
        method: 'PATCH',
        data: JSON.stringify(newdata),
        contentType: 'application/json;odata=verbose',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'MERGE',
            'If-Match': '*'
        },
        success: function (data) { onSuccess(data); },
        error: function (data) { onError(data) }
    });
}

function deleteListItemById(listTitle, itemId, onSuccess, onError, async) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")",
        async: async ? async : true,
        type: 'POST',
        contentType: 'application/json;odata=verbose',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'IF-MATCH': '*',
            'X-HTTP-Method': 'DELETE',
        },
        success: function (data) { onSuccess(data); },
        error: function (data) { onError(data); }
    });
}

// future functions
function createList() {}
function deleteList() {}