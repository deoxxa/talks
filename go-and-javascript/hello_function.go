package main

import (
	"fmt"
	"github.com/robertkrimen/otto"
)

func main() {
	vm := otto.New()

	vm.Set("hello", func() {
		fmt.Println("Hello, Function!")
	})

	vm.Run(`hello()`)
}
