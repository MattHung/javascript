/**
 * Created by matt1201 on 2015/12/16.
 */


self.onmessage = function(event) {
    self.postMessage(event.data);
    self.close();
};


