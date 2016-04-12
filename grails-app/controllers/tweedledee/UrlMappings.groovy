
class UrlMappings {
    
    static mappings = {
       "/$controller/$action?/$id?(.$format)?" {
          constraints {
            // apply constraints here
          }
        }
        "/"(view:'/index')
        //"500"(controller:'Error',action: 'internalServerError')
        //"401"(controller:'Error',action: 'unauthorized')
        //"403"(controller:'Error',action: 'forbidden')
        //"404"(controller:'Error',action: 'notFound')
        //"405"(controller:'Error',action: 'notallowed')
        //"422"(controller:'Error',action: 'unprocessable')
        "/account"(resources:'account'){
            "/message"(resources:'message')
        }
        "/account/$accountId/follow"(controller:'account',action:'addFollower')
        "/account/$accountId/followers"(controller:'account',action:'showFollowers')
        "/account/$accountId/following"(controller:'account',action:'showFollowing')
        "/message/${accountId}/messages"(controller:'message',action:'lastTenMessages')
        "/messages/search"(controller:'message',action:'searchMessages')
        "/account/$accountId/feed"(controller:'account',action:'showFeed')
        "/init"(controller:'account',action:'initMe')
        "/login"(controller:'account',action:'auth')
        "/punk"(controller:'account',action:'initAdmin')

        //These are behind security wall for now
        "/api/init"(controller:'account',action:'initMe')
        "/api/account"(resources:'account'){
            "/message"(resources:'message')
        }
        "/api/account/$accountId"(controller:'account',action:'showFeed')
        "/api/account/$accountId/feed"(controller:'account',action:'showFeed')
    }
}

