package main

import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/polly"

    "fmt"
    "os"
    "io"
    "io/ioutil"
    //"path/filepath"
)

func get_audio(text string) (string) {
    //if len(os.Args) != 2 {
    //    fmt.Println("You must supply an alarm name")
    //    os.Exit(1)
    //}

    // The name of the text file to convert to MP3
    //fileName := os.Args[1]

    // Open text file and get it's contents as a string
    //contents, err := ioutil.ReadFile(fileName)
    //if err != nil {
    //    fmt.Println("Got error opening file " + fileName)
    //    fmt.Print(err.Error())
    //    os.Exit(1)
    //}

    // Convert bytes to string
    //s := string(contents[:])

    // Initialize a session that the SDK uses to load
    // credentials from the shared credentials file. (~/.aws/credentials).
    sess := session.Must(session.NewSessionWithOptions(session.Options{
        SharedConfigState: session.SharedConfigEnable,
    }))

    // Create Polly client
    svc := polly.New(sess)

    // Output to MP3 using voice Joanna
    input := &polly.SynthesizeSpeechInput{OutputFormat: aws.String("mp3"), Text: aws.String(text), VoiceId: aws.String("Joanna")}

    output, err := svc.SynthesizeSpeech(input)
    if err != nil {
        fmt.Println("Got error calling SynthesizeSpeech:")
        fmt.Print(err.Error())
        os.Exit(1)
    }

    // Save as MP3
    //names := strings.Split(fileName, ".")

    //name := "audio-" + Calendar.getInstance().getTimeInMillis()
    //mp3File := name + ".mp3"
    //filePath, _ := filepath.Abs("../audio-wave/build/static/media/audio/" + mp3File)

    //outFile, err := os.Create(filePath)
    file, err := ioutil.TempFile("../audio-wave/build/static/media/audio", "audio-*.mp3")
    if err != nil {
        fmt.Println("Got error creating " + file.Name() + ":")
        fmt.Print(err.Error())
        os.Exit(1)
    }
    
    fmt.Println("Saving to: " + file.Name());

    defer file.Close()

    if err := os.Chmod(file.Name(), 0644); err != nil {
	fmt.Println(err.Error())
    }

    _, err = io.Copy(file, output.AudioStream)
    if err != nil {
        fmt.Println("Got error saving MP3:")
        fmt.Print(err.Error())
        os.Exit(1)
    }

    return file.Name()
}
