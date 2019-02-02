package main

import (
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
		router := mux.NewRouter()
		router.HandleFunc("/text/{string}", SubmitText).Methods("POST")
    log.Fatal(http.ListenAndServe(":8000", router))
}

func SubmitText(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var audio Audio
	_ = json.NewDecoder(r.Body).Decode(&audio)
	json.NewEncoder(w).Encode(audio)
}