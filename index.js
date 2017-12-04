var subscriptions = {};

function logSubs() {
    console.log(subscriptions);
}

function createToken(topic, fnRef){
    var functionHash = hash(fnRef.toString());
    var str = topic + fnRef;
    var token = 'sub' + hash(str);
    return {
        token: token,
        fn: functionHash
    };
}

function setSubs(subsArray) { // subsArray is array of topic/function pair arrays
    subsArray.forEach(function(pair){
        var topic = pair[0],
            fnRef = pair[1],
            tokenObj = createToken(topic,fnRef);
        
        if ( subscriptions[tokenObj.fn] === undefined ) {
            subscriptions[tokenObj.fn] = {};
        }
        if ( subscriptions[tokenObj.fn][topic] === undefined ) {
            subscriptions[tokenObj.fn][topic] = PubSub.subscribe(topic,fnRef);  
        } else {
            throw 'Subscription token is already in use.';
        }
    });
}

function cancelSub(topic,fnRef) { // for canceling single subscription
    var tokenObj = createToken(topic,fnRef);
    if ( subscriptions[tokenObj.fn] !== undefined && subscriptions[tokenObj.fn][topic] !== undefined ) {
        PubSub.unsubscribe( subscriptions[tokenObj.fn][topic] );
        delete subscriptions[tokenObj.fn][topic];
        if ( Object.keys(subscriptions[tokenObj.fn]).length === 0 ) {
            delete subscriptions[tokenObj.fn];
        }
    } else {
        throw 'Subscription does not exist.';
    }
}

module.exports = {
    logSubs:logSubs,
    setSubs:setSubs,
    cancelSub:cancelSub
};