FROM golang:1.25.0

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o booking-service ./booking-service/cmd/app

EXPOSE 8081

CMD ["./booking-service"]