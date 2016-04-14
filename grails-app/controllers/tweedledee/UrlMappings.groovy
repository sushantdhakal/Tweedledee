
class UrlMappings {
    
    static mappings = {
       "/$controller/$action?/$id?(.$format)?" {
          constraints {
            // apply constraints here
          }
        }

        // Defaults to the index.gsp which spawns the angular app
        "/"(view:'/index')

        // For testing
        "/init"(controller:'account',action:'initMe')
        "/login"(controller:'account',action:'auth')
        "/punk"(controller:'account',action:'initAdmin')

        // Errors
        //"500"(controller:'Error',action: 'internalServerError')
        //"401"(controller:'Error',action: 'unauthorized')
        //"403"(controller:'Error',action: 'forbidden')
        //"404"(controller:'Error',action: 'notFound')
        //"405"(controller:'Error',action: 'notallowed')
        //"422"(controller:'Error',action: 'unprocessable')
        
        // Main API Routes
        "/api/account/$accountId/followers"(controller:'account',action:'showFollowers')
        "/api/account/$accountId/following"(controller:'account',action:'showFollowing')
        "/api/message/${accountId}/messages"(controller:'message',action:'lastTenMessages')
        "/api/messages/search"(controller:'message',action:'searchMessages')
        "/api/init"(controller:'account',action:'initMe')
        "/api/account"(resources:'account'){
            "/message"(resources:'message')
        }
        "/api/account/$accountId"(controller:'account',action:'showFeed')
        "/api/account/$accountId/feed"(controller:'account',action:'showFeed')
        "/api/account/$accountId/follow"(controller:'account',action:'addFollower')
    }
}

