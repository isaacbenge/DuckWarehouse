export default class Observer {
    constructor() {
      this.subscribers = [];
    }
  
    // Add a new subscriber
    subscribe(callback) {
      if (typeof callback === 'function') {
        this.subscribers.push(callback);
      }
    }
  
    // Remove subscriber 
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    }
  
    // Notify payload
    notify(data) {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i](data);
          }
        }
  }