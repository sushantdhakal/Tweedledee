<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <asset:javascript src="application.js"/>
    <asset:stylesheet src="application.css"/>
    <asset:stylesheet src="tweedledee.css"/>
    <asset:stylesheet src="simple-sidebar.css"/>
</head>

<body class="mainBodyDiv" ng-app="app">
<h1>TweedleDee</h1>


<div ng-view>
    <div ng-show="currentUserLoggedIn != null">
        Welcome {{currentUserLoggedIn}}
    </div>
    </div>

</body>
</html>
