package main

import (
	"github.com/robertkrimen/otto"
)

func main() {
	vm := otto.New()

	vm.Set("hello", "Hello, JavaScript!")

	vm.Run(`console.log(hello)`)
}
