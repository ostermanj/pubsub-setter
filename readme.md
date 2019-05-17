# PubSub Setter

Helper methods on top of npm package pubsub-js. Set, cancel, and keep track of PubSub subscriptions. Each subscription gets a unique token; alerts developers to duplicate subscriptions. Allows setting many subcriptions with one function call.

## Change from last version

`setSubs()` no longer creates hashed token for keeping track of subscriptions. Use pubsub.js's native methods instead. This fixes `token already in use` errors.

## Methods

`logSubs()` : log the collection of subscriptions

`setSubs([[msg, functionReference], ... ])` : set the PubSub subscriptions according to the array of msg-function pairs

`cancelSub(msg, functionReference)` : cancel the function's subscription to the specified message; remove from subscription collection

## Example

```javascript
var component = {
    init(){
        setSubs([                               // <= here set two PubSub subscriptions
            ['appReady', component.step2],
            ['step2Finished', component.step3]
        ]);
        this.step1();
    },
    step1(){
        // do stuff
        PubSub.publish('appReady', true);
    },
    step2(){
        // do stuff
        PubSub.publish('step2Finished', true);
    },
    step3(){
        // do some stuff
    }
};

component.init();
```

