# NodeJS build stage
FROM node:10.15.3-alpine as clientbuilder

WORKDIR /app

COPY . .

RUN cd client && \
    npm install && \
    npm run build

# Go build stage
FROM golang:1.12 as builder

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o anon-chat

# Final stage
FROM alpine:3.9.2

WORKDIR /app

COPY --from=builder /app/anon-chat /app/
COPY --from=builder /app/.env /app/
COPY --from=clientbuilder /app/client/build /app/client/build

RUN pwd
RUN ls
RUN ls client/build

EXPOSE 3001

ENTRYPOINT ["/app/anon-chat"]