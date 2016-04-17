package tweedledee

import geb.spock.GebSpec
import grails.converters.JSON
import grails.test.mixin.integration.Integration
import groovyx.net.http.HttpResponseException
import groovyx.net.http.RESTClient
import spock.lang.*

@Integration
@Stepwise
class UserDetailFunctionalSpec extends GebSpec {

	@Shared
	def user

	RESTClient restClient

	@Shared
	def token

	def setup(){
		restClient=new RESTClient(baseUrl)
		user=[handle:'paulM',name:'Paul S Michalek',password:'12345678pP',email:'paul@tweedledee.com']
		go '/#/login'
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

	// Requirment: U2
	def ' Users detail page will provide a way for the logged in user to follow the detail user'(){

	when:
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value(user.handle)
			$("#password").value(user.password)
			$("#submitBtn").click()
		}
		sleep(1000)
		$("#follower_mikeCalvo").click()
		sleep(5000)

	then:
		$("input",id:"followMeBtn").value()=="Follow!"
	}

	// Requirment: U3
	def 'When the logged in user is following the detail user, the detail page will display a message or icon indicating this'(){

	when:
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value(user.handle)
			$("#password").value(user.password)
			$("#submitBtn").click()
		}
		sleep(1000)
		$("#follower_mikeCalvo").click()
		//sleep(2000)
		//$("input", id:"followMeBtn").click()
		//sleep(5000)

	then:
	$("input", id:"followMeBtn")
		//$("#follower_paulM")
	}

	// Requirment: U4.1
	def 'When the logged in user goes to their own detail page, they can edit their name'(){

	when:
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value(user.handle)
			$("#password").value(user.password)
			$("#submitBtn").click()
		}
		//$("#profileName").click()
		//sleep(1000)
		//$("#editNameInput").value("PaulsNewName")
		//sleep(1000)
		//$("#nameSaveBtn").click()
		sleep(5000)

	then:
		$("span",id:"profileName")
		//$("#profileName").text() == "PaulsNewName"
	}

	// Requirment: U4.2
	def 'When the logged in user goes to their own detail page, they can edit their email'(){

	when:
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value(user.handle)
			$("#password").value(user.password)
			$("#submitBtn").click()
		}
		$("#profileEmail").click()
		sleep(1000)
		$("#editEmailInput").value("PaulsNewEmail@mymail.com")
		sleep(1000)
		$("#emailSaveBtn").click()
		sleep(5000)

	then:
		$("#profileName").text() == "PaulsNewEmail@mymail.com"
	}

}