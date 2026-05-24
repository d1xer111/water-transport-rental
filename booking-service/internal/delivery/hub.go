package delivery

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)

var broadcast = make(chan string)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func HandleConnections(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)

	if err != nil {
		return
	}

	defer ws.Close()

	clients[ws] = true

	for {
		_, _, err := ws.ReadMessage()

		if err != nil {
			delete(clients, ws)
			break
		}
	}
}

func HandleMessages() {
	for {
		msg := <-broadcast

		for client := range clients {
			err := client.WriteJSON(gin.H{
				"message": msg,
			})

			if err != nil {
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func SendNotification(message string) {
	broadcast <- message
}
