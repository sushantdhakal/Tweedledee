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


/**
 * Account: Functional Test 1
 * Desc: Testing account resource fetch and CRUD operations 
 */
@Ignore
@Unroll
@Integration
@Stepwise
class AccountResourceFunctionalSpec extends GebSpec {

  @Shared
  def accountId
  def accountHandle

  def validAccountData
  RESTClient restClient

  def setup() {
    restClient = new RESTClient(baseUrl)
    validAccountData = [handle: 'Hulk77', name: 'Hulk Hogan', email: 'thehulkster@hulkomania.me', password: '12345678aA']
  }

  /**
   * Test 1.1
   * Requirement: A1
   * Desc: Creates an account resource
   */
  def 'creates a new acount'() {

    given:
    def acount = new Account(validAccountData)
    def json = acount as JSON

    when:
    def resp = restClient.post(path: "/account", body: json as String, requestContentType: 'application/json')

    then:
    resp.status == 201
    resp.data

    when:
    accountId = resp.data.id
    accountHandle = resp.data.handle

    then:
    accountId
    resp.data.handle == validAccountData.handle
    resp.data.name == validAccountData.name
    resp.data.email == validAccountData.email
    resp.data.password == validAccountData.password
  }

  /**
   * Test 1.1.2
   * Requirement: A1
   * Desc: Fails to create a new account with same handle
   */
  def 'fails to create a new acount when using duplicate handle'() {

    given:
    def p = validAccountData
    p.email = 'somethinelse@s.com'
    def acount = new Account(p)
    def json = acount as JSON

    when:
    restClient.post(path: "/account", body: json as String, requestContentType: 'application/json')

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 422
  }

  /**
   * Test 1.1.3
   * Requirement: A1
   * Desc: Fails to create a new account with same email
   */
  def 'fails ot create a new acount when using duplicate email'() {

    given:
    def p = validAccountData
    p.handle = 'SomethingElse'
    def acount = new Account(p)
    def json = acount as JSON

    when:
    restClient.post(path: "/account", body: json as String, requestContentType: 'application/json')

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 422

  }

  /**
   * Test 1.0
   * Requirement: A1
   * Desc: Gets an account resource
   *
   */

  def 'get all account resources'() {

    when:
    def resp = restClient.get(path: "/accounts")

    then:
    resp.status == 200
    resp.data.size() == 1

  }

  /**
   * Test 1.2
   * Requirement: A1
   * Desc: Retrieves a saved account resource by id
   */
  def 'gets a new account by id'() {

    when:
    def resp = restClient.get(path: "/account/${accountId}")

    then:
    resp.status == 200
    resp.data.id == accountId
    resp.data.handle == validAccountData.handle
    resp.data.name == validAccountData.name
    resp.data.email == validAccountData.email
  }

  /**
   * Test 1.2.1
   * Requirement: A1
   * Desc: Retrieves a saved account resource by handle
   */
  def 'gets a new account by handle'() {

    when:
    def resp = restClient.get(path: "/account", query: [handle: validAccountData.handle])

    then:
    resp.status == 200
    resp.data.id == accountId
    resp.data.handle == validAccountData.handle
    resp.data.name == validAccountData.name
    resp.data.email == validAccountData.email
  }

  /**
   * Test 1.3
   * Requirement: A1
   * Desc: Edit an account resource
   */
  def 'updates an existing account'() {

    given:
    def updatedName = 'Hulk MF Hogan'
    validAccountData.name = updatedName
    def account = new Account(validAccountData)
    def json = account as JSON

    when:
    def resp = restClient.put(path: "/account/${accountId}", body: json as String, requestContentType: 'application/json')

    then:
    resp.status == 200

    when:
    resp = restClient.get(path: "/account/${accountId}")

    then:
    resp.status == 200
    resp.data.name == updatedName

  }

  /**
   * Test 1.4
   * Requirement: A1
   * Desc: Delete an account resource
   */
  def 'deletes an account'() {
    given:
    def resp1 = restClient.get(path: "/accounts")

    when:
    def resp = restClient.delete(path: "/account/${accountId}")

    then:
    resp.status == 204

    when:
    restClient.get(path: "/account/${accountId}")

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 404
  }

  /**
   * Test 1.5
   * Requirement: A2
   * Desc: Responds with error when missing account data sent in an account create request 
   */
  def 'fails to create account with missing account data in request: #desc'() {

    given:
    def aParams = [handle: testHandle, name: testName, email: testEmail, password: testPassword]
    def account = new Account(aParams)
    def json = account as JSON

    when:
    def resp = restClient.post(path: "/account", body: json as String, requestContentType: 'application/json')

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 422

    when:
    restClient.get(path: "/account")

    then:
    HttpResponseException err1 = thrown(HttpResponseException)
    err1.statusCode == 422

    where:
    desc               | testHandle | testName | testEmail | testPassword
    "missing handle"   | ""         | "Ted"    | "a@b.com" | "12345678aA"
    "missing name"     | "trox"     | ""       | "a@b.com" | "12345678aA"
    "missing email"    | "trox"     | "Ted"    | ""        | "12345678aA"
    "missing password" | "trox"     | "Ted"    | "a@b.com" | ""

  }

  /**
   * Test 1.6
   * Requirement: A2
   * Desc: Responds with error when invalid password sent in an account create request
   */
  def 'fails to create account if invalid password is sent in request: #desc #testPassword'() {

    given:
    def aParams = [handle: "TedX9", name: "Ted", email: "ted@bla.com", password: testPassword]
    def account = new Account(aParams)
    def json = account as JSON

    when:
    restClient.post(path: "/account", body: json as String, requestContentType: 'application/json')

    then:
    HttpResponseException err = thrown(HttpResponseException)
    err.statusCode == 422

    when:
    resp = restClient.get(path: "/account")

    then:
    HttpResponseException err1 = thrown(HttpResponseException)
    err1.statusCode == 422

    where:
    desc                  | testPassword
    "less than 8 chars"   | "1" * 3
    "over than 16 chars"  | "1" * 20
    "no upper case chars" | "2a" * 4
    "no lower case chars" | "1A" * 4
  }
}