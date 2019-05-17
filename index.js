var PubSub = require("pubsub-js");

const subscriptions = [];

function logSubs(){
    console.log(subscriptions);
}

function setSubs(subsArray) { // subsArray is array of topic/function pair arrays
    subsArray.forEach(function(pair){
        var topic = pair[0],
            fnRef = pair[1];
        subscriptions.push(PubSub.subscribe(topic,fnRef));
    });
}

function cancelSub(topic,fnRef) { // for canceling single subscription
    console.log('pubsub',subscriptions);
    var token = PubSub.subscribe(topic,fnRef),
        index = subscriptions.indexOf(token);
    console.log('pubsub',token);
    if ( index !== -1 ) {
        PubSub.unsubscribe(token);
        subscriptions.splice(index,1);
    } else {
        throw 'Subscription does not exist.';
    }
}

module.exports = {
    logSubs:logSubs,
    setSubs:setSubs,
    cancelSub:cancelSub
};