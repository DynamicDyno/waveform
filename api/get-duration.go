package main

import (
	"fmt"
	"os/exec"
	"bytes"
	"strings"
)

func get_duration(filename string) (string) {
	app := "ffprobe"

	arg0 := "-i"
	arg1 := filename
	arg2 := "-show_entries"
	arg3 := "format=duration"
	arg4 := "-v"
	arg5 := "quiet"
	arg6 := "-of"
	arg7 := "csv=p=0" 

	cmd := exec.Command(app, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()

	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
	}

	// trim line breaks
	duration := strings.TrimSuffix(out.String(), "\n")
	duration = duration + "s"

	return duration
}
