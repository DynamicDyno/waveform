package main

import (
	"fmt"
	"strings"
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
)

type Media struct {
	Audio     string  `json:"audio"`
	Wave      string  `json:"wave"`
	Duration  string  `json:"duration"`
}

// our main function
func main() {
	fmt.Println("Listening on port 8080")
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"}) 
	originsOk := handlers.AllowedOrigins([]string{"*"}) 
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	router := mux.NewRouter()
	router.HandleFunc("/waveform/text/{tts_string}", SubmitText).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}

func SubmitText(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	fmt.Println("Getting audio for " + vars["tts_string"])

	audio_filename := get_audio(vars["tts_string"])
	wave_filename := generate_waveform(audio_filename)
	duration := get_duration(audio_filename)

	audio_uri := getAbsoluteUrl(audio_filename)
	wave_uri := getAbsoluteUrl(wave_filename)

	media := Media{audio_uri, wave_uri, duration}

	json.NewEncoder(w).Encode(media)
}

func getAbsoluteUrl(path string) (string) {
	relative_url := strings.Replace(path, "../audio-wave/build/", "", -1)
	absolute_url := "http://68.183.30.161/waveform/" + relative_url;
	return absolute_url
}
