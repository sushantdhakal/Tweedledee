package tweedledee

import geb.spock.GebSpec
import grails.converters.JSON
import grails.test.mixin.integration.Integration
import groovyx.net.http.HttpResponseException
import groovyx.net.http.RESTClient
import spock.lang.*

@Integration
class UserDetailFunctionalSpec extends GebSpec {

	@Shared
	def user

	RESTClient restClient

	@Shared
	def token

	def setup(){
		restClient=new RESTClient(baseUrl)
		user=[handle:'admin',name:'Johnny Admin',password:'12345678pP',email:'admin@tweedledee.com']
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value(user.handle)
			$("#password").value(user.password)
			$("#submitBtn").click();
		}
		def auth=([username:user.handle, password:user.password] as JSON) as String
		def resp=restClient.post(path:'/api/login',body:auth,requestContentType:'application/json')
		if(resp.status==200) token=resp.data.access_token
	}

	// Requirment: U1.1
	def 'User detail page will display the current user name'(){
		when:
		user

		then:
		waitFor(){
			$("#profileName").text().contains(user.name)
		}
	}

	// Requirment: U1.2
	def 'User detail page will contain a list of message for the current user'(){
		when:
		def mesgs=[]
		def resp=restClient.get(path:'/api/account/'+user.handle+'/messages?max=25&offset=0',headers:['X-Auth-Token':token])
		if(resp.status==200) mesgs=resp.data
		def scrollProof = 	"var style = window.getComputedStyle(document.getElementById('userMessagesList'), null);"+
							"var vHeight = parseInt(style.getPropertyValue('height'));"+
							"var sHeight = document.getElementById('userMessagesList').scrollHeight;"+
							"return (sHeight > vHeight) ? true : false;"
		sleep(5000)
   
		then:
		browser.driver.executeScript(scrollProof)
		mesgs.each(){
			$("messageId${it.id}_text").text() == it.text
		}		
	}
	def 'Following user'(){

	when:
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value(user.handle)
			$("#password").value(user.password)
			$("#submitBtn").click();
			waitFor(){
				$("#following_paulM").click();
			}
			waitFor(5){
				$("#follower_mikeCalvo").click();
				waitFor(5){
					$("#followMeBtn").click();
				}
			}
		}

		then:
		waitFor(5){
			//$("#following_paulM");
			//$("#followMeBtn")
			//("#followMeBtn")
			$("$followingMessage")

		}

	}




}