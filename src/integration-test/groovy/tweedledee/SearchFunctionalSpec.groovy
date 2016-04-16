package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import org.junit.BeforeClass

@Integration
class SearchFunctionalSpec extends GebSpec {


    def login(){
        go '/'
        waitFor("quick"){
            $("#username").value("admin")
            $("#password").value("12345678pP")
            $("#submitBtn").click();
        }

    }

    //S1
    def 'Search Box is for provided finding messages'(){
        when:
        go '/'
        waitFor("quick"){
            $("#username").value("admin")
            $("#password").value("12345678pP")
            $("#submitBtn").click();
        }
        then:
        waitFor(){
            currentUrl.contains "profile"
        }
        $("#searchBox").value("hello sushant")
        $("#searchBtn").click()
    }

    //N1





}