package tweedledee

import geb.spock.GebSpec
import grails.converters.JSON
import grails.test.mixin.integration.Integration
import groovyx.net.http.HttpResponseException
import groovyx.net.http.RESTClient
import spock.lang.*

@Ignore
@Integration
@Stepwise
class UserDetailFunctionalSpec extends GebSpec {

	@Shared
	def user

	RESTClient restClient

	@Shared
	def token

	def setup()
	{
		restClient=new RESTClient(baseUrl)
		user=[handle:'admin',name:'Johnny Admin',password:'12345678pP',email:'admin@tweedledee.com']
		go '/#/login?logout=1'
		sleep(1000)
		go '/'
		waitFor("quick"){ 
			$("#username").value(user.handle)
			$("#password").value(user.password)
			$("#submitBtn").click()
		}
		def auth=([username:user.handle, password:user.password] as JSON) as String
		def resp=restClient.post(path:'/api/login',body:auth,requestContentType:'application/json')
		if(resp.status==200) token=resp.data.access_token
	}

	// Requirment: U1.1
	def 'User detail page will display the current user name (U1)'()
	{
		when:
		user

		then:
		waitFor 5, { $("#profileName").text().contains(user.name) }
		

	}

	// Requirment: U1.2
	def 'User detail page will contain a list of message for the current user (U1)'()
	{
		
		when:
			def mesgs=[]
			def resp=restClient.get(path:'/api/account/'+user.handle+'/messages?max=25&offset=0',headers:['X-Auth-Token':token])
			if(resp.status==200) mesgs=resp.data
			def scrollProof = 	"var style = window.getComputedStyle(document.getElementById('userMessagesList'), null);"+
								"var vHeight = parseInt(style.getPropertyValue('height'));"+
								"var sHeight = document.getElementById('userMessagesList').scrollHeight;"+
								"return (sHeight > vHeight) ? true : false;"

		then:
			waitFor 5, { browser.driver.executeScript(scrollProof) }
			mesgs.each(){
				$("messageId${it.id}_text").text() == it.text
			}

	}

	// Requirment: U2
	def ' Users detail page will provide a way for the logged in user to follow the detail user (U2)'()
	{

		when:
			user
			go '/#/account/mikeCalvo'

		then:
		waitFor 5, { $("input",id:"followMeBtn").value()=="Follow!" }
	
	}

	// Requirment: U3
	def 'When the logged in user is following the detail user, the detail page will display a message or icon indicating this (U3)'()
	{

		when:
			user
			go '/#/account/paulM'

		then:
		waitFor 5, {
			$("li",id:"followingMessage")
			$("li",id:"followingMessage").text().contains("Following")
		}
	}

	// Requirment: U4.1
	def 'When the logged in user goes to their own detail page, they can edit their name (U4)'()
	{

		when:
			user

		then:
			waitFor 5, { $("input",id:"editNameBtn").click() }
			waitFor { $("input",id:"editNameInput").value("AdminsNewName") }
		  waitFor { $("input",id:"editNameSaveBtn").click() }
			waitFor(5,0.1){
				$("span",id:"profileName").text() == "AdminsNewName"
			}

	}

	// Requirment: U4.2
	def 'When the logged in user goes to their own detail page, they can edit their email (U4)'()
	{

		when:
			user

		then:
			waitFor 5, { $("input",id:"editEmailBtn").click() }
			waitFor { $("input",id:"editEmailInput").value("newadmineamil@me.net") }
			waitFor { $("input",id:"editEmailSaveBtn").click() }
			waitFor(5,0.1){
				$("span",id:"profileEmail").text() == "newadmineamil@me.net"
			}

	}

}