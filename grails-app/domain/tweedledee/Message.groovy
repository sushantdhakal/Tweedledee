package tweedledee

class Message {
    String text
    Date dateCreated
    static belongsTo = [ account : Account ]
    static mapping = {
        sort dateCreated:'desc'
    }
    static constraints = {
        text nullable:false,size: 1..40
    }
}
