package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import org.junit.BeforeClass
import spock.lang.Ignore
import spock.lang.Stepwise

@Integration
@Stepwise
class SearchFunctionalSpec extends GebSpec {

    def login() {
        go '/'
        waitFor("quick") {
            $("#username").value("admin")
            $("#password").value("12345678pP")
            $("#submitBtn").click();
        }
    }


    //S1 and N2
    def 'Search Box is displayed'(){
        when: 'n'
            login()
        then:
            $("#searchBox").isDisplayed()
    }


    //S2
    def 'Search Box is for provided finding messages'(){
        when: 'n'
         login()
        waitFor("quick"){
            $("#searchBox").value("message")
            $("#searchBtn").click()
        }
        then:
        Thread.sleep(2000)
        $("#message-list").isDisplayed()

    }

    def 'Search will not find messages'(){
        when:
        waitFor(){
            $("#searchBox").value("Hello There")
            $("#searchBtn").click()
        }
        then:
        !($("#message-list").isDisplayed())
        $("#searchResultsNotFound").value(" No Messages Found. ")
    }

    //S3 and S4
}