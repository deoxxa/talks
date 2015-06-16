package main

import (
	"github.com/robertkrimen/otto"
	"io/ioutil"
	"net/http"
)

func main() {
	vm := otto.New()

	// please handle your errors!
	vm.Set("get", func(call otto.FunctionCall) otto.Value {
		res, _ := http.Get(call.Argument(0).String())
		data, _ := ioutil.ReadAll(res.Body)
		val, _ := vm.ToValue(string(data))
		return val
	})

	vm.Run(`console.log(get("http://intranet.campjs.com"))`)
}
