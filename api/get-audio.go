package main

import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/polly"

    "fmt"
    "os"
    "io"
    "io/ioutil"
)

func get_audio(text string) (string) {
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

    file, err := ioutil.TempFile("/var/www/assets/audio", "audio-*.mp3")
    if err != nil {
        fmt.Println("Got error creating " + file.Name() + ":")
        fmt.Print(err.Error())
        os.Exit(1)
    }

    defer file.Close()

    // Change permissions so the server serve the assets
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
