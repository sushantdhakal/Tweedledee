// File: grails-app/conf/spring/resources.groovy

import tweedledee.Account
import grails.rest.render.json.JsonCollectionRenderer
import grails.rest.render.xml.XmlCollectionRenderer

beans = {
    //jsonAccountCollectionRenderer(JsonCollectionRenderer, Account)
    //xmlAccountCollectionRenderer(XmlCollectionRenderer, Account)

    // Uncomment the following to register collection renderers
    // for all domain classes in the application.
    // for (domainClass in grailsApplication.domainClasses) {
    //     "json${domainClass.shortName}CollectionRenderer(JsonCollectionRenderer, domainClass.clazz)
    //     "xml${domainClass.shortName}CollectionRenderer(XmlCollectionRenderer, domainClass.clazz)
    // }
}