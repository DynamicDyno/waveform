# Waveform

Show the waveform of an audio sample. You can play with a [demo of the app here](http://68.183.30.161/waveform/). There are two projects in this repo:

1. api- backend API written in Golang
2. audiowave- frontend React app

## Dependencies

Install ffmpeg (instructions for debian/ubuntu:)

```
sudo add-apt-repository ppa:jonathonf/ffmpeg-4
sudo apt-get update
sudo apt-get install ffmpeg
```

Go dependencies:

```
go get -u github.com/aws/aws-sdk-go/...
go get github.com/gorilla/mux
go get github.com/gorilla/handlers

```

## Install and run

### API

```
cd api
./api
```

### React app

```
cd audio-wave
yarn
yarn start
```

## API Endpoints

There's only one:

### GET /waveform/text/:string

##### URI parameters:

- **string**: The string to make a waveform for

example response body:

```
{
  "audio":"http://68.183.30.161/assets/audio/audio-252134362.mp3","wave":"http://68.183.30.161/assets/images/audio-252134362.png",
  "duration":"2.377167s"
}
```

## Tests

In the React app, run `yarn test`.

![Tests](https://i.imgur.com/O2jZDc6.png?1)

## Responsive

The app works on screens of any size.

![Responsive](https://i.imgur.com/i2V3onT.png?1)