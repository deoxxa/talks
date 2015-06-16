package main

import (
	"encoding/json"
	"github.com/robertkrimen/otto"
	"io/ioutil"
	"net/http"
)

func main() {
	// again, please handle your errors!
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		vm := otto.New()
		data, _ := ioutil.ReadAll(r.Body)
		val, _ := vm.Run(string(data))
		res, _ := val.Export()
		json.NewEncoder(w).Encode(res)
	})

	http.ListenAndServe(":3000", http.DefaultServeMux)
}
