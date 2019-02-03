package main

import (
	"fmt"
	"os/exec"
	"bytes"
	"strings"
	"path/filepath"
)

func generate_waveform(filename string) (string) {
	//filename := os.Args[1]
	app := "ffmpeg"

	filenameNoSuffix := strings.TrimSuffix(filename, filepath.Ext(filename))

	arg0 := "-i"
	arg1 := filename
	arg2 := "-filter_complex"
	arg3 := "showwavespic=s=672x500:colors=#73A0CC"
	arg4 := "-frames:v"
	arg5 := "1"
	arg6 := filenameNoSuffix + ".png"

	cmd := exec.Command(app, arg0, arg1, arg2, arg3, arg4, arg5, arg6)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()

	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
	}

	//fmt.Println("Result: " + out.String())

	return filenameNoSuffix + ".png"
}
