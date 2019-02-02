package main

import (
	"fmt"
	"strings"
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)

type Media struct {
	Audio string `json:"audio"`
	Wave  string `json:"wave"`
}

// our main function
func main() {
	fmt.Println("Listening on port 8080")
	router := mux.NewRouter()
	router.HandleFunc("/waveform/text/{tts_string}", SubmitText).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func SubmitText(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	fmt.Println("Getting audio for " + vars["tts_string"])
	
	audio_filename := get_audio(vars["tts_string"])
	wave_filename := generate_waveform(audio_filename)
	audio_uri := getWebUri(audio_filename)
	wave_uri := getWebUri(wave_filename)
	
	media := Media{audio_uri, wave_uri}
	
	json.NewEncoder(w).Encode(media)
}

func getWebUri(path string) (string) {
	uri := strings.Replace(path, "../audio-wave/build/", "", -1)
	return uri
}
