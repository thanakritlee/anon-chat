FROM golang:1.10

RUN mkdir -p go/src/anon-chat
WORKDIR /go/src/anon-chat

ADD . /go/src/anon-chat

# Install go project dependencies
RUN go get -d -v ./... && \
    go build

EXPOSE 80

CMD ["anon-chat"]