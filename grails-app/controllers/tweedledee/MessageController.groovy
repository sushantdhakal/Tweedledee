package tweedledee

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController

class MessageController extends RestfulController<Message> {
    
    static responseFormats = ['json', 'xml']

    MessageController() {
        super(Message)
    }

    @Override
    def index(final Integer max) {
        if(params.accountId){
            params.max = Math.min(max?:10,100)
            def accountID = _handleAccountId(params.accountId)
            def mesg=Message.where { account.id == accountID }.list(params)
            respond mesg
        }
        _respondError(422,"No account")
    }

    @Override
    def show(){
        def id=params.id
        def accountID = _handleAccountId(params.accountId)
        def mesg=Message.where { id == id && account.id == accountID }.find()
        respond mesg
    }

    def lastTenMessages(final Integer max,final Integer offset){
        def limit = Math.min(max?:10,100)
        def os = (offset) ? Math.min(offset,100) : 0
        def accountID= _handleAccountId(params.accountId)
        def account = Account.get(accountID)
        if(account){
            def mesg = Message.where { account.id == accountID }.list(max:limit,offset:os)
            respond mesg
        } else _respondError(404,"No account found")
    }

    def searchMessages(){
        def searchTerm=request.JSON.searchTerm
        def res = Message.where {
            text==~"%$searchTerm%" }.list().collect{
            res->return [message:res, handle:Account.get(res.account.id).handle]
        }
        respond res
    }

    @Override
    def create(){
        _respondError(404,"Not found")
    }

    @Override
    protected Message queryForResource(Serializable id) {
        def accountID = _handleAccountId(params.accountId)
        Message.where { id == id && account.id == accountID }.find()
    }

    @Override
    protected Message createResource() {
        def text=request.JSON.text
        def accountID = _handleAccountId(params.accountId)
        def account=Account.get(accountID)
        def p=[text:text,account:[id:accountID]]
        new Message(p)
    }

    private _handleAccountId(accountID){
        def isNum = (accountID as String).isNumber()
        if(!isNum){
            def acct=Account.findByHandle(accountID)
            if(acct) return acct.id
            else _respondError(422,"Invalid account")
        }else if(accountID){
            return accountID
        }else {
            _respondError(422,"No account")
        }
    }

    private _respondError(code,mesg){
        response.status=code
        respond error:code,message:"$mesg"
    }
}