package main

import (
	"fmt"
	"github.com/robertkrimen/otto"
)

func main() {
	vm := otto.New()

	res, err := vm.Run(`"Hello, go!"`)
	if err != nil {
		panic(err)
	}

	fmt.Println(res)
}
