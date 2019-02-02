package main

import (
	"fmt"
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)

type Audio struct {
	text string   `json:"text,omitempty"`
}

// our main function
func main() {
	fmt.Println("Listening on port 8000")
	router := mux.NewRouter()
	router.HandleFunc("/text/{tts_string}", SubmitText).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", router))
}

func SubmitText(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("Serving request.")
	//fmt.Println("??")
	vars := mux.Vars(r)
	//fmt.Println("test")
	fmt.Println("Getting audio for " + vars["tts_string"])
	get_audio(vars["tts_string"])
	var audio Audio
	_ = json.NewDecoder(r.Body).Decode(&audio)
	json.NewEncoder(w).Encode(vars)
}
