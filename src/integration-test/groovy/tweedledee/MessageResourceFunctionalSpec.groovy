package tweedledee

import geb.spock.GebSpec
import grails.converters.JSON
import grails.test.mixin.integration.Integration
import groovyx.net.http.HttpResponseException
import groovyx.net.http.RESTClient
import spock.lang.Shared
import spock.lang.Stepwise
import spock.lang.Unroll
import spock.lang.Ignore

@Ignore
@Unroll
@Integration
@Stepwise
class MessageResourceFunctionalSpec extends GebSpec {

  @Shared
  def accountId

  @Shared
  def accountHandle

  @Shared
  def messageId

  def validAccountData

  RESTClient restClient

  def setup() {

    restClient = new RESTClient(baseUrl)

    validAccountData = [handle: 'Hulk77', name: 'Hulk Hogan', email: 'dedup-thehulkster@hulkomania.me', password: '12345678aA']

  }

  def 'set account id'() {

    when:
    def account = new Account(validAccountData)
    def json = account as JSON
    def resp = restClient.post(path: "/account", body: json as String, requestContentType: 'application/json')

    then:
    resp.status == 201

    when:
    accountId = resp.data.id
    accountHandle = resp.data.handle

    then:
    accountId
    accountHandle

  }

  /**
   * Test 2
   * Requirement: M2
   * Desc: Creates a message resource
   */
  def 'Create a new message'() {

    given:
    def mesg = [text: 'This is a new message for you']
    def json = mesg as JSON

    when:
    def resp = restClient.post(path: "/account/${accountId}/messages", body: json as String, requestContentType: 'application/json')

    then:
    resp.status == 201
    resp.data

    when:
    messageId = resp.data.id

    then:
    messageId
    resp.data.text == 'This is a new message for you'
  }

  /**
   * Assignment 2
   * Requirement: M2
   * Create a test for if a message cannot be created (if the message text is invalid)
   *
   */

  def 'Return error message creation with an invalid message'() {

    given:
    def mesg = [text: 'This is a new message for you (123456789012345667889909889848484889997443223399999900)']
    def json = mesg as JSON

    when:
    restClient.post(path: "/account/${accountId}/messages", body: json as String, requestContentType: 'application/json')

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 422
  }

  /**
   * Assignment 2
   * Requirement: M2
   * Create a test for if a message cannot be created (if the account is invalid)
   *
   */

  def 'Return error message creation with an invalid account'() {

    given:
    def mesg = [text: 'This is a new message for you']
    def json = mesg as JSON

    when:
    def resp = restClient.post(path: "/account/abcXYZ/messages", body: json as String, requestContentType: 'application/json')

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 422
  }

  /**
   * Test 2.1
   * Requirement: M2
   * Desc: Retrieve a saved message
   */
  def 'fetch a saved a message for an account by id'() {

    when:
    def resp = restClient.get(path: "/account/${accountId}/message/${messageId}")

    then:
    resp.status == 200
    resp.data.id == messageId

  }

  /**
   * Test 2.1.1
   * Requirement: M2
   * Desc: Retrieve a saved message
   */
  def 'fetch a saved a message for an account by hande'() {

    when:
    def resp = restClient.get(path: "/account/${accountHandle}/message/${messageId}")

    then:
    resp.status == 200
    resp.data.id == messageId

  }

  /**
   * Test 2.2
   * Requirement: M3
   * Desc: This method will get the most recent messages with the default max value of 10.
   * The test will create 20 messages upfront, but according by default, should only get 10.
   */

  def 'get last messages'() {
    given:
    def mesg = "This is message number: " as String
    (1..20).each {
      restClient.post(path: "/account/${accountId}/messages", body: [text: mesg + it], contentType: 'application/json')
    }

    when: 'This will get the recent messages with the default value of 10'
    def resp = restClient.get(path: "/message/${accountId}/messages")

    then:
    resp.status == 200
    resp.data
    resp.data.size() == 10
  }

  /**
   * Test 2.3
   * Requirement: M4
   * Desc: Support of offset parameter
   */

  def 'offset parameter support'() {
    given:
    def mesg = "This is message number: " as String
    (1..20).each {
      restClient.post(path: "/account/${accountId}/messages", body: [text: mesg + it], contentType: 'application/json')
    }

    when:
    def resp = restClient.get(path: "/message/${accountId}/messages", query: [max: 7])

    then:
    resp.status == 200
    resp.data
    resp.data.size() == 7


    when:
    def messageId = resp.data[1].id
    def resp2 = restClient.get(path: "/message/${accountId}/messages", query: [offset: 1])

    then:
    resp2.status == 200
    resp2.data[0].id == messageId
  }

  /**
   * Test 2.3
   * Requirement: M5
   * Desc: This test will search for search for messages containing a specified search term
   */

  def 'search message'() {
    given:
    def messageToSearch = "This is message number: " as String

    when:
    def resp = restClient.post(path: "/messages/search", body: [searchTerm: messageToSearch], contentType: 'application/json')

    then:
    resp.status == 200
    resp.data.message
    resp.data.handle
  }

  /**
   * Test 2.4
   * Requirement: M2
   * Desc: Saved message can be updated
   */
  def 'update a saved a message'() {

    given:
    def mesg = [text: 'This is a new message for you ALSO!']
    def json = mesg as JSON

    when:
    def resp = restClient.put(path: "/account/${accountId}/message/${messageId}", body: json as String, requestContentType: 'application/json')

    then:
    resp.status == 200

    when:
    resp = restClient.get(path: "/account/${accountId}/message/${messageId}")

    then:
    resp.status == 200
    resp.data.text == 'This is a new message for you ALSO!'

  }
  /**
   * Test 2.5
   * Requirement: M1
   * Desc: Delete a message resource
   */
  def 'deletes a message'() {

    when:
    def resp = restClient.delete(path: "/account/${accountId}/message/${messageId}")

    then:
    resp.status == 204

    when:
    restClient.get(path: "/account/${accountId}/messages/${messageId}")

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 404

  }
}