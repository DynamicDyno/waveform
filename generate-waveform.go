package main

import (
	"fmt"
	"os"
	"os/exec"
	"bytes"
)

func main() {
	filename := os.Args[1]
	app := "ffmpeg"

	arg0 := "-i"
	arg1 := filename
	arg2 := "-filter_complex"
	arg3 := "showwavespic=s=640x120"
	arg4 := "-frames:v"
	arg5 := "1"
	arg6 := "rick-roll.png"

	cmd := exec.Command(app, arg0, arg1, arg2, arg3, arg4, arg5, arg6)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()

	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		return
	}

	fmt.Println("Result: " + out.String())
}
